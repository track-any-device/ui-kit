'use client';

import { useEffect, useRef } from 'react';

import { hasGoogleMapsKey, loadGoogleMaps } from '../../lib/google-maps-loader';
import {
    isDarkMode,
    mapStyleForAppearance,
    watchDarkMode,
} from '../../lib/map-styles';
import { cn } from '../../lib/utils';

export type CmsBackground = {
    kind?: 'image' | 'color' | 'gradient' | 'video' | 'map' | null;
    image_path?: string | null;
    video_url?: string | null;
    video_poster?: string | null;
    color_token?: string | null;
    gradient_from?: string | null;
    gradient_to?: string | null;
    gradient_direction?: string | null;
    overlay_alpha?: number | null;
    map_center_lat?: number | null;
    map_center_lng?: number | null;
    map_zoom?: number | null;
    map_show_devices?: boolean | null;
};

const COLOR_TOKEN_CLASSES: Record<string, string> = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    muted: 'bg-muted',
    surface: 'bg-card',
    card: 'bg-card',
    secondary: 'bg-secondary',
};

const GRADIENT_DIRECTION_CLASSES: Record<string, string> = {
    'to-r': 'bg-gradient-to-r',
    'to-l': 'bg-gradient-to-l',
    'to-b': 'bg-gradient-to-b',
    'to-t': 'bg-gradient-to-t',
    'to-br': 'bg-gradient-to-br',
    'to-bl': 'bg-gradient-to-bl',
};

/**
 * Absolute-positioned background layer for a section. Sits behind content;
 * caller is responsible for putting it inside a `relative` parent and giving
 * the parent dimensions.
 */
export function SectionBackground({ bg }: { bg?: CmsBackground | null }) {
    if (!bg || !bg.kind) {
        return null;
    }

    const overlay = bg.overlay_alpha ?? 0;

    if (bg.kind === 'color') {
        return (
            <div
                aria-hidden
                className={cn(
                    'absolute inset-0',
                    COLOR_TOKEN_CLASSES[bg.color_token ?? 'primary'] ??
                        'bg-primary',
                )}
            />
        );
    }

    if (bg.kind === 'gradient') {
        const directionClass =
            GRADIENT_DIRECTION_CLASSES[bg.gradient_direction ?? 'to-br'] ??
            'bg-gradient-to-br';

        return (
            <>
                <div
                    aria-hidden
                    className={cn('absolute inset-0', directionClass)}
                    style={{
                        backgroundImage: `linear-gradient(${cssDirection(bg.gradient_direction)}, ${bg.gradient_from ?? '#1e293b'}, ${bg.gradient_to ?? '#0f172a'})`,
                    }}
                />
                <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.35))',
                    }}
                />
                {overlay > 0 && (
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-black"
                        style={{ opacity: overlay / 100 }}
                    />
                )}
            </>
        );
    }

    if (bg.kind === 'image' && bg.image_path) {
        const imageOverlay = bg.overlay_alpha == null ? 50 : overlay;

        return (
            <>
                <div
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bg.image_path})` }}
                />
                {imageOverlay > 0 && (
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-black"
                        style={{ opacity: imageOverlay / 100 }}
                    />
                )}
            </>
        );
    }

    if (bg.kind === 'video' && bg.video_url) {
        const videoOverlay = bg.overlay_alpha == null ? 50 : overlay;

        return (
            <>
                <video
                    aria-hidden
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={bg.video_poster ?? undefined}
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src={bg.video_url} />
                </video>
                {videoOverlay > 0 && (
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-black"
                        style={{ opacity: videoOverlay / 100 }}
                    />
                )}
            </>
        );
    }

    if (bg.kind === 'map') {
        return (
            <MapBackground
                lat={bg.map_center_lat ?? 31.5204}
                lng={bg.map_center_lng ?? 74.3587}
                zoom={bg.map_zoom ?? 6}
                showDevices={bg.map_show_devices ?? false}
                overlay={overlay}
            />
        );
    }

    return null;
}

function cssDirection(dir?: string | null): string {
    switch (dir) {
        case 'to-r':
            return 'to right';
        case 'to-l':
            return 'to left';
        case 'to-b':
            return 'to bottom';
        case 'to-t':
            return 'to top';
        case 'to-bl':
            return 'to bottom left';
        case 'to-br':
        default:
            return 'to bottom right';
    }
}

function MapBackground({
    lat,
    lng,
    zoom,
    showDevices,
    overlay,
}: {
    lat: number;
    lng: number;
    zoom: number;
    showDevices: boolean;
    overlay: number;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const animationRef = useRef<number | null>(null);
    const panCleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!containerRef.current || mapRef.current || !hasGoogleMapsKey()) {
            return;
        }

        const container = containerRef.current;

        loadGoogleMaps()
            .then((maps) => {
                if (!containerRef.current) {
                    return;
                }

                mapRef.current = new maps.Map(containerRef.current, {
                    center: { lat, lng },
                    zoom,
                    disableDefaultUI: true,
                    gestureHandling: 'none',
                    keyboardShortcuts: false,
                    clickableIcons: false,
                    backgroundColor: isDarkMode() ? '#212121' : '#f5f5f5',
                    styles: mapStyleForAppearance(isDarkMode()),
                });

                if (showDevices) {
                    const samples: Array<{ lat: number; lng: number }> = [
                        { lat: lat + 0.3, lng: lng - 0.8 },
                        { lat: lat - 0.4, lng: lng + 0.6 },
                        { lat: lat + 0.1, lng: lng + 1.2 },
                        { lat: lat - 0.6, lng: lng - 0.5 },
                        { lat: lat + 0.5, lng: lng + 0.2 },
                    ];
                    samples.forEach((p) => {
                        new maps.Marker({
                            position: p,
                            map: mapRef.current!,
                            icon: {
                                path: maps.SymbolPath.CIRCLE,
                                scale: 6,
                                fillColor: 'var(--primary)',
                                fillOpacity: 0.9,
                                strokeColor: '#ffffff',
                                strokeWeight: 2,
                            },
                        });
                    });
                }

                panCleanupRef.current = startSlowPan(
                    maps,
                    mapRef,
                    animationRef,
                    container,
                    { lat, lng },
                );
            })
            .catch((e) => {
                console.warn('Google Maps load failed', e);
            });

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }

            if (panCleanupRef.current) {
                panCleanupRef.current();
                panCleanupRef.current = null;
            }
        };
    }, [lat, lng, zoom, showDevices]);

    useEffect(() => {
        return watchDarkMode((isDark) => {
            mapRef.current?.setOptions({
                styles: mapStyleForAppearance(isDark),
                backgroundColor: isDark ? '#212121' : '#f5f5f5',
            });
        });
    }, []);

    if (!hasGoogleMapsKey()) {
        return <MapBackgroundStub overlay={overlay} />;
    }

    return (
        <>
            <div aria-hidden ref={containerRef} className="absolute inset-0" />
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%)',
                }}
            />
            {overlay > 0 && (
                <div
                    aria-hidden
                    className="absolute inset-0 bg-black"
                    style={{ opacity: overlay / 100 }}
                />
            )}
        </>
    );
}

function startSlowPan(
    maps: typeof google.maps,
    mapRef: React.MutableRefObject<google.maps.Map | null>,
    animationRef: React.MutableRefObject<number | null>,
    container: HTMLElement,
    origin: { lat: number; lng: number },
): () => void {
    const noop = () => {};

    if (typeof window === 'undefined') {
        return noop;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduced.matches) {
        return noop;
    }

    const maxRadiusLat = 0.8;
    const maxRadiusLng = 1.1;
    const speedLat = 0.35;
    const speedLng = 0.5;
    const decayPerSec = 0.6;
    const deadZone = 0.05;

    let cursor: { x: number; y: number } | null = null;

    const handleMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();

        if (rect.width === 0 || rect.height === 0) {
            return;
        }

        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        cursor = {
            x: Math.max(-1, Math.min(1, nx)),
            y: Math.max(-1, Math.min(1, ny)),
        };
    };

    const handleLeave = () => {
        cursor = null;
    };

    container.addEventListener('pointermove', handleMove);
    container.addEventListener('pointerleave', handleLeave);
    container.addEventListener('pointercancel', handleLeave);

    let offsetLat = 0;
    let offsetLng = 0;
    let last = performance.now();

    const tick = (now: number) => {
        if (!mapRef.current) {
            return;
        }

        const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
        last = now;

        if (cursor) {
            const mag = Math.hypot(cursor.x, cursor.y);

            if (mag > deadZone) {
                offsetLat += -cursor.y * speedLat * dt;
                offsetLng += cursor.x * speedLng * dt;
            }
        } else if (offsetLat !== 0 || offsetLng !== 0) {
            const decay = Math.max(0, 1 - decayPerSec * dt);
            offsetLat *= decay;
            offsetLng *= decay;
        }

        offsetLat = Math.max(-maxRadiusLat, Math.min(maxRadiusLat, offsetLat));
        offsetLng = Math.max(-maxRadiusLng, Math.min(maxRadiusLng, offsetLng));

        mapRef.current.panTo(
            new maps.LatLng(origin.lat + offsetLat, origin.lng + offsetLng),
        );
        animationRef.current = window.requestAnimationFrame(tick);
    };

    animationRef.current = window.requestAnimationFrame(tick);

    return () => {
        container.removeEventListener('pointermove', handleMove);
        container.removeEventListener('pointerleave', handleLeave);
        container.removeEventListener('pointercancel', handleLeave);
    };
}

function MapBackgroundStub({ overlay }: { overlay: number }) {
    return (
        <>
            <div
                aria-hidden
                className="absolute inset-0 bg-muted"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, oklch(0 0 0 / 0.06) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
            <svg
                aria-hidden
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 800 400"
                preserveAspectRatio="xMidYMid slice"
            >
                {[
                    [180, 120],
                    [320, 250],
                    [500, 90],
                    [640, 220],
                    [240, 320],
                    [560, 340],
                ].map(([cx, cy], i) => (
                    <g key={i}>
                        <circle
                            cx={cx}
                            cy={cy}
                            r="14"
                            className="fill-primary"
                            opacity="0.15"
                        >
                            <animate
                                attributeName="r"
                                values="14;28;14"
                                dur="2.5s"
                                begin={`${i * 0.3}s`}
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="opacity"
                                values="0.4;0;0.4"
                                dur="2.5s"
                                begin={`${i * 0.3}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle
                            cx={cx}
                            cy={cy}
                            r="5"
                            className="fill-primary"
                        />
                    </g>
                ))}
            </svg>
            {overlay > 0 && (
                <div
                    aria-hidden
                    className="absolute inset-0 bg-background"
                    style={{ opacity: overlay / 100 }}
                />
            )}
        </>
    );
}
