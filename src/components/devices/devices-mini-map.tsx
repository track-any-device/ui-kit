'use client';

/**
 * Compact device map — "where are my devices" at a glance.
 *
 * Marker logic:
 *   • Device has a heading  → rotated arrow image (CSS rotate)
 *   • Device has no heading → static coloured pin circle
 *
 * Marker colour = network signal strength (0–100 %):
 *   red (0–25) · purple (26–50) · blue (51–75) · green (76–100)
 */
import { MapPin } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

import { hasGoogleMapsKey, loadGoogleMaps } from '../../lib/google-maps-loader';
import {
    arrowRotation,
    deviceArrowUrl,
    devicePinColor,
    useArrow,
} from '../../lib/map-markers';
import {
    isDarkMode,
    mapStyleByName,
    mapStyleForAppearance,
    watchDarkMode,
    type MapStyleName,
} from '../../lib/map-styles';
import { cn } from '../../lib/utils';

export type MiniMapDevice = {
    id: number | string;
    name: string | null;
    imei: string | null;
    last_lat: number | null;
    last_lon: number | null;
    /** 0–100 network signal percentage. Drives marker colour. */
    signal?: number | null;
    /** Heading in degrees clockwise from north (0–360). Present → arrow marker. */
    heading?: number | null;
};

/** Incident flag placed at the location where the incident was last opened. */
export type MiniMapIncident = {
    id: number | string;
    lat: number;
    lon: number;
    flagUrl: string;
    title?: string;
};

type Props = {
    devices: MiniMapDevice[];
    incidents?: MiniMapIncident[];
    height?: string;
    className?: string;
    title?: string;
    fallbackCenter?: { lat: number; lng: number };
    /** Override map style. When omitted the style follows app dark/light mode. */
    mapStyle?: MapStyleName;
    /** For Storybook only — force the no-key fallback state. */
    _forceNoKey?: boolean;
};

/** Size of the arrow image rendered inside AdvancedMarkerElement. */
const ARROW_SIZE_PX = 32;
/** Diameter of the static pin circle. */
const PIN_SIZE_PX = 18;
/** Size of incident flag images. */
const FLAG_SIZE_PX = 28;

function makeArrowElement(device: MiniMapDevice): HTMLElement {
    const img = document.createElement('img');
    img.src = deviceArrowUrl(device.signal);
    img.width = ARROW_SIZE_PX;
    img.height = ARROW_SIZE_PX;
    img.title = device.name ?? device.imei ?? `Device ${device.id}`;
    img.style.display = 'block';
    img.style.transformOrigin = 'center center';
    img.style.transform = arrowRotation(device.heading);
    img.style.filter = 'drop-shadow(0 1px 2px rgba(0,0,0,.4))';
    return img;
}

function makePinElement(device: MiniMapDevice): HTMLElement {
    const div = document.createElement('div');
    const color = devicePinColor(device.signal);
    div.title = device.name ?? device.imei ?? `Device ${device.id}`;
    div.style.cssText = [
        `width:${PIN_SIZE_PX}px`,
        `height:${PIN_SIZE_PX}px`,
        `border-radius:50%`,
        `background:${color}`,
        `border:2.5px solid #fff`,
        `box-shadow:0 1px 4px rgba(0,0,0,.35)`,
        `cursor:pointer`,
    ].join(';');
    return div;
}

function makeFlagElement(incident: MiniMapIncident): HTMLElement {
    const img = document.createElement('img');
    img.src = incident.flagUrl;
    img.width = FLAG_SIZE_PX;
    img.height = FLAG_SIZE_PX;
    if (incident.title) img.title = incident.title;
    img.style.display = 'block';
    img.style.filter = 'drop-shadow(0 1px 3px rgba(0,0,0,.4))';
    return img;
}

export function DevicesMiniMap({
    devices,
    incidents = [],
    height = '320px',
    className,
    title,
    fallbackCenter = { lat: 31.5204, lng: 74.3587 },
    mapStyle,
    _forceNoKey = false,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef      = useRef<google.maps.Map | null>(null);
    // AdvancedMarkerElement has no common base type in older @types/google.maps;
    // store as unknown and cast when calling setMap.
    const markersRef  = useRef<unknown[]>([]);
    const flagsRef    = useRef<unknown[]>([]);

    const positioned = useMemo(
        () => devices.filter(
            (d): d is MiniMapDevice & { last_lat: number; last_lon: number } =>
                d.last_lat !== null && d.last_lon !== null,
        ),
        [devices],
    );

    const resolvedStyle = mapStyle
        ? mapStyleByName(mapStyle)
        : mapStyleForAppearance(isDarkMode());

    useEffect(() => {
        if (!containerRef.current || !hasGoogleMapsKey()) return;

        let cancelled = false;

        loadGoogleMaps().then((maps) => {
            if (cancelled || !containerRef.current) return;

            // Initialise map once.
            if (!mapRef.current) {
                mapRef.current = new maps.Map(containerRef.current, {
                    center: fallbackCenter,
                    zoom: 6,
                    disableDefaultUI: true,
                    zoomControl: true,
                    clickableIcons: false,
                    backgroundColor: isDarkMode() ? '#212121' : '#f5f5f5',
                    styles: resolvedStyle,
                    mapId: 'devices-mini-map',
                });
            } else {
                mapRef.current.setOptions({ styles: resolvedStyle });
            }

            // ── Device markers ──────────────────────────────────────────────
            (markersRef.current as Array<{ setMap: (m: null) => void }>)
                .forEach((m) => m.setMap(null));
            markersRef.current = [];

            const bounds = new maps.LatLngBounds();
            const AdvancedMarkerElement =
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (maps as any).marker?.AdvancedMarkerElement as
                    | (new (o: object) => { setMap: (m: null) => void })
                    | undefined;

            positioned.forEach((d) => {
                const position = { lat: d.last_lat, lng: d.last_lon };
                const content  = useArrow(d.heading)
                    ? makeArrowElement(d)
                    : makePinElement(d);

                if (AdvancedMarkerElement) {
                    const marker = new AdvancedMarkerElement({
                        map: mapRef.current,
                        position,
                        content,
                    });
                    markersRef.current.push(marker);
                } else {
                    // Fallback: legacy Marker with SVG circle icon.
                    const color = devicePinColor(d.signal);
                    const marker = new maps.Marker({
                        position,
                        map: mapRef.current!,
                        title: d.name ?? d.imei ?? `Device ${d.id}`,
                        icon: {
                            path: maps.SymbolPath.CIRCLE,
                            scale: 7,
                            fillColor: color,
                            fillOpacity: 0.95,
                            strokeColor: '#ffffff',
                            strokeWeight: 2,
                        },
                    });
                    markersRef.current.push(marker as unknown);
                }

                bounds.extend(position);
            });

            // ── Incident flags ──────────────────────────────────────────────
            (flagsRef.current as Array<{ setMap: (m: null) => void }>)
                .forEach((f) => f.setMap(null));
            flagsRef.current = [];

            incidents.forEach((inc) => {
                const content = makeFlagElement(inc);
                if (AdvancedMarkerElement) {
                    const flag = new AdvancedMarkerElement({
                        map: mapRef.current,
                        position: { lat: inc.lat, lng: inc.lon },
                        content,
                    });
                    flagsRef.current.push(flag);
                }
            });

            // ── Fit bounds ──────────────────────────────────────────────────
            if (positioned.length === 1) {
                mapRef.current!.setCenter({ lat: positioned[0].last_lat, lng: positioned[0].last_lon });
                mapRef.current!.setZoom(11);
            } else if (positioned.length > 1) {
                mapRef.current!.fitBounds(bounds, 40);
            }
        }).catch((e) => console.warn('Map load failed', e));

        return () => { cancelled = true; };
    }, [positioned, incidents, fallbackCenter, resolvedStyle]);

    useEffect(() => {
        if (mapStyle) return;
        return watchDarkMode((isDark) => {
            mapRef.current?.setOptions({
                styles: mapStyleForAppearance(isDark),
                backgroundColor: isDark ? '#212121' : '#f5f5f5',
            });
        });
    }, [mapStyle]);

    if (_forceNoKey || !hasGoogleMapsKey()) {
        return (
            <div
                className={cn(
                    'relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/40 text-muted-foreground',
                    className,
                )}
                style={{ height }}
            >
                <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-6 w-6" />
                    <p className="text-sm font-medium">Map preview unavailable</p>
                    <p className="mt-1 text-xs">
                        Configure VITE_GOOGLE_MAPS_API_KEY to render device positions here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn('relative overflow-hidden rounded-xl border border-border', className)}
            style={{ height }}
        >
            {title && (
                <div className="pointer-events-none absolute top-3 left-3 z-10 rounded-md bg-background/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                    {title}
                </div>
            )}
            <div ref={containerRef} className="absolute inset-0" />
            {positioned.length === 0 && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/40 text-sm text-muted-foreground">
                    No device positions yet.
                </div>
            )}
        </div>
    );
}
