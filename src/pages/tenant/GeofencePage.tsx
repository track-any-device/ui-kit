import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@trackany-device/components';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { MapPin, Plus, Trash2, X } from 'lucide-react';
import { loadGoogleMaps, hasGoogleMapsKey } from '../../lib/google-maps-loader';

export type GeofenceType   = 'inclusion' | 'exclusion';
export type GeofenceStatus = 'active' | 'inactive';

export type LatLng = { lat: number; lng: number };

export interface Geofence {
    id: number;
    name: string;
    type: GeofenceType;
    status: GeofenceStatus;
    triggers: number;
    polygon: LatLng[];
}

const TYPE_COLOR: Record<GeofenceType, string> = {
    inclusion: '#22c55e',
    exclusion: '#ef4444',
};

const TYPE_BADGE: Record<GeofenceType, string> = {
    inclusion: 'text-green-600 border-green-200 bg-green-50',
    exclusion: 'text-red-600 border-red-200 bg-red-50',
};

const STATUS_BADGE: Record<GeofenceStatus, string> = {
    active:   'text-green-600 border-green-200 bg-green-50',
    inactive: 'text-muted-foreground border-border bg-muted',
};

function polygonBounds(maps: typeof google.maps, polygon: LatLng[]): google.maps.LatLngBounds {
    const bounds = new maps.LatLngBounds();
    polygon.forEach((p) => bounds.extend(new maps.LatLng(p.lat, p.lng)));
    return bounds;
}

export function GeofenceListPage({ layout, geofences }: { layout: LayoutName; geofences: Geofence[] }) {
    const [selectedId, setSelectedId] = useState<number | null>(geofences[0]?.id ?? null);
    const [mapReady, setMapReady]     = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef       = useRef<google.maps.Map | null>(null);
    const mapsApiRef   = useRef<typeof google.maps | null>(null);
    const polysRef     = useRef<Map<number, google.maps.Polygon>>(new Map());

    const inclusionCount = geofences.filter((g) => g.type === 'inclusion').length;
    const exclusionCount = geofences.filter((g) => g.type === 'exclusion').length;
    const activeCount    = geofences.filter((g) => g.status === 'active').length;

    useEffect(() => {
        if (!hasGoogleMapsKey() || !containerRef.current) return;

        loadGoogleMaps().then((maps) => {
            mapsApiRef.current = maps;
            mapRef.current = new maps.Map(containerRef.current!, {
                center: { lat: 31.5204, lng: 74.3587 },
                zoom: 11,
                disableDefaultUI: true,
                zoomControl: true,
            });
            setMapReady(true);
        });
    }, []);

    useEffect(() => {
        if (!mapReady || !mapsApiRef.current || !mapRef.current) return;
        const maps = mapsApiRef.current;

        polysRef.current.forEach((poly) => poly.setMap(null));
        polysRef.current.clear();

        geofences.forEach((gf) => {
            const isSelected = gf.id === selectedId;
            const strokeColor = TYPE_COLOR[gf.type];
            const poly = new maps.Polygon({
                paths: gf.polygon.map((p) => ({ lat: p.lat, lng: p.lng })),
                strokeColor,
                strokeWeight: isSelected ? 3 : 1.5,
                fillColor: strokeColor,
                fillOpacity: isSelected ? 0.3 : 0.15,
                map: mapRef.current!,
            });
            poly.addListener('click', () => setSelectedId(gf.id));
            polysRef.current.set(gf.id, poly);
        });
    }, [mapReady, geofences, selectedId]);

    useEffect(() => {
        if (!mapReady || !mapsApiRef.current || !mapRef.current || selectedId === null) return;
        const gf = geofences.find((g) => g.id === selectedId);
        if (!gf || gf.polygon.length === 0) return;
        const bounds = polygonBounds(mapsApiRef.current, gf.polygon);
        mapRef.current.fitBounds(bounds, 60);
    }, [mapReady, selectedId, geofences]);

    return (
        <LayoutResolved layout={layout} title="Geofences" currentUrl="/geofences">
            <div className="flex h-[calc(100vh-3.5rem)]">
                <div className="flex w-1/3 min-w-[260px] flex-col border-r border-border bg-background overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3 shrink-0">
                        <div>
                            <h1 className="text-base font-semibold">Geofences</h1>
                            <p className="text-xs text-muted-foreground">{geofences.length} total</p>
                        </div>
                        <Button size="sm">
                            <Plus className="h-3.5 w-3.5 mr-1" />Add geofence
                        </Button>
                    </div>

                    <div className="grid grid-cols-4 divide-x divide-border border-b border-border shrink-0">
                        {[
                            { label: 'Total',     value: geofences.length },
                            { label: 'Inclusion', value: inclusionCount },
                            { label: 'Exclusion', value: exclusionCount },
                            { label: 'Active',    value: activeCount },
                        ].map(({ label, value }) => (
                            <div key={label} className="px-2 py-2 text-center">
                                <p className="text-base font-bold text-primary">{value}</p>
                                <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-border">
                        {geofences.map((gf) => {
                            const isSelected = gf.id === selectedId;
                            return (
                                <button
                                    key={gf.id}
                                    onClick={() => setSelectedId(gf.id)}
                                    className={`w-full text-left px-4 py-3 hover:bg-muted/40 transition-colors ${isSelected ? 'bg-muted/60' : ''}`}
                                    style={isSelected ? { boxShadow: `inset 3px 0 0 ${TYPE_COLOR[gf.type]}` } : undefined}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{gf.name}</p>
                                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                                <Badge variant="outline" className={`text-xs ${TYPE_BADGE[gf.type]}`}>{gf.type}</Badge>
                                                <Badge variant="outline" className={`text-xs ${STATUS_BADGE[gf.status]}`}>{gf.status}</Badge>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xs font-medium">{gf.triggers}</p>
                                            <p className="text-[10px] text-muted-foreground">triggers</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 relative bg-muted/20">
                    {hasGoogleMapsKey() ? (
                        <div ref={containerRef} className="absolute inset-0" />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                            <MapPin className="h-10 w-10" />
                            <p className="text-sm font-medium">Map preview unavailable</p>
                            <p className="text-xs">Set VITE_GOOGLE_MAPS_API_KEY to enable the map</p>
                        </div>
                    )}
                </div>
            </div>
        </LayoutResolved>
    );
}

interface PendingZone {
    coords: LatLng[];
}

let nextId = 1000;

export function GeofenceEditorPage({ layout, geofences: initialGeofences }: { layout: LayoutName; geofences: Geofence[] }) {
    const [geofences, setGeofences]       = useState<Geofence[]>(initialGeofences);
    const [selectedId, setSelectedId]     = useState<number | null>(null);
    const [isDrawing, setIsDrawing]       = useState(false);
    const [pendingZone, setPendingZone]   = useState<PendingZone | null>(null);
    const [pendingName, setPendingName]   = useState('');
    const [pendingType, setPendingType]   = useState<GeofenceType>('inclusion');

    const containerRef    = useRef<HTMLDivElement>(null);
    const mapRef          = useRef<google.maps.Map | null>(null);
    const mapsApiRef      = useRef<typeof google.maps | null>(null);
    const polysRef        = useRef<Map<number, google.maps.Polygon>>(new Map());
    const drawingRef      = useRef<google.maps.drawing.DrawingManager | null>(null);
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (!hasGoogleMapsKey() || !containerRef.current) return;

        loadGoogleMaps().then((maps) => {
            mapsApiRef.current = maps;
            mapRef.current = new maps.Map(containerRef.current!, {
                center: { lat: 31.5204, lng: 74.3587 },
                zoom: 11,
                disableDefaultUI: true,
                zoomControl: true,
            });
            setMapReady(true);
        });
    }, []);

    useEffect(() => {
        if (!mapReady || !mapsApiRef.current || !mapRef.current) return;
        const maps = mapsApiRef.current;

        polysRef.current.forEach((poly) => poly.setMap(null));
        polysRef.current.clear();

        geofences.forEach((gf) => {
            const isSelected  = gf.id === selectedId;
            const strokeColor = TYPE_COLOR[gf.type];
            const poly = new maps.Polygon({
                paths: gf.polygon.map((p) => ({ lat: p.lat, lng: p.lng })),
                strokeColor,
                strokeWeight: isSelected ? 3 : 1.5,
                fillColor: strokeColor,
                fillOpacity: isSelected ? 0.3 : 0.15,
                map: mapRef.current!,
            });
            poly.addListener('click', () => setSelectedId(gf.id));
            polysRef.current.set(gf.id, poly);
        });
    }, [mapReady, geofences, selectedId]);

    useEffect(() => {
        if (!mapReady || !mapsApiRef.current || !mapRef.current || selectedId === null) return;
        const gf = geofences.find((g) => g.id === selectedId);
        if (!gf || gf.polygon.length === 0) return;
        const bounds = polygonBounds(mapsApiRef.current, gf.polygon);
        mapRef.current.fitBounds(bounds, 60);
    }, [mapReady, selectedId]);

    function activateDrawing() {
        if (!mapsApiRef.current || !mapRef.current) return;
        const maps = mapsApiRef.current;

        if (drawingRef.current) {
            drawingRef.current.setMap(null);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dm = new (maps as any).drawing.DrawingManager({
            drawingMode: (maps as any).drawing.OverlayType.POLYGON,
            drawingControl: false,
            polygonOptions: {
                strokeWeight: 2,
                fillOpacity: 0.2,
                editable: false,
            },
            map: mapRef.current,
        });

        maps.event.addListener(dm, 'polygoncomplete', (poly: google.maps.Polygon) => {
            dm.setDrawingMode(null);
            const coords = poly.getPath().getArray().map((p) => ({ lat: p.lat(), lng: p.lng() }));
            poly.setMap(null);
            setPendingZone({ coords });
            setIsDrawing(false);
        });

        drawingRef.current = dm;
        setIsDrawing(true);
        setPendingZone(null);
    }

    function saveZone() {
        if (!pendingZone || !pendingName.trim()) return;
        const newGf: Geofence = {
            id: ++nextId,
            name: pendingName.trim(),
            type: pendingType,
            status: 'active',
            triggers: 0,
            polygon: pendingZone.coords,
        };
        setGeofences((prev) => [...prev, newGf]);
        setSelectedId(newGf.id);
        setPendingZone(null);
        setPendingName('');
        setPendingType('inclusion');
    }

    function discardZone() {
        setPendingZone(null);
        setPendingName('');
        setPendingType('inclusion');
    }

    function deleteGeofence(id: number) {
        setGeofences((prev) => prev.filter((g) => g.id !== id));
        if (selectedId === id) setSelectedId(null);
    }

    return (
        <LayoutResolved layout={layout} title="Geofence Editor" currentUrl="/geofences/edit">
            <div className="flex h-[calc(100vh-3.5rem)]">
                <div className="flex w-[280px] shrink-0 flex-col border-r border-border bg-background overflow-hidden">
                    <div className="border-b border-border px-4 py-3">
                        <h1 className="text-base font-semibold">Geofences</h1>
                    </div>

                    <div className="border-b border-border p-3">
                        <Button
                            size="sm"
                            className="w-full"
                            onClick={activateDrawing}
                            disabled={isDrawing}
                        >
                            <Plus className="h-3.5 w-3.5 mr-1.5" />Draw new zone
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-border">
                        {geofences.map((gf) => {
                            const isSelected = gf.id === selectedId;
                            return (
                                <div
                                    key={gf.id}
                                    className={`flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-muted/40 transition-colors ${isSelected ? 'bg-muted/60' : ''}`}
                                    style={isSelected ? { boxShadow: `inset 3px 0 0 ${TYPE_COLOR[gf.type]}` } : undefined}
                                    onClick={() => setSelectedId(gf.id)}
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{gf.name}</p>
                                        <Badge variant="outline" className={`text-xs mt-0.5 ${TYPE_BADGE[gf.type]}`}>{gf.type}</Badge>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteGeofence(gf.id); }}
                                        className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 relative bg-muted/20">
                    {hasGoogleMapsKey() ? (
                        <>
                            <div ref={containerRef} className="absolute inset-0" />

                            {(isDrawing || pendingZone) && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                                    {isDrawing && (
                                        <Badge className="bg-primary text-primary-foreground shadow-md">Drawing</Badge>
                                    )}
                                    {isDrawing && (
                                        <div className="rounded-md border border-border bg-background/95 px-3 py-1.5 text-xs shadow-md backdrop-blur-sm">
                                            Click the map to start drawing. Click first point to close.
                                        </div>
                                    )}
                                </div>
                            )}

                            {pendingZone && (
                                <div className="absolute bottom-4 left-4 z-10 w-64">
                                    <Card className="shadow-lg">
                                        <CardHeader className="pb-2 pt-3 px-4">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-sm">Name this zone</CardTitle>
                                                <button onClick={discardZone} className="text-muted-foreground hover:text-foreground">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="px-4 pb-4 space-y-3">
                                            <div className="space-y-1.5">
                                                <Label className="text-xs">Type</Label>
                                                <select
                                                    value={pendingType}
                                                    onChange={(e) => setPendingType(e.target.value as GeofenceType)}
                                                    className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                >
                                                    <option value="inclusion">Inclusion</option>
                                                    <option value="exclusion">Exclusion</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className="text-xs">Name</Label>
                                                <Input
                                                    value={pendingName}
                                                    onChange={(e) => setPendingName(e.target.value)}
                                                    placeholder="Zone name"
                                                    onKeyDown={(e) => { if (e.key === 'Enter') saveZone(); }}
                                                />
                                            </div>
                                            <div className="flex gap-2 pt-1">
                                                <Button size="sm" className="flex-1" onClick={saveZone} disabled={!pendingName.trim()}>
                                                    Save
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={discardZone}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                            <MapPin className="h-10 w-10" />
                            <p className="text-sm font-medium">Map preview unavailable</p>
                            <p className="text-xs">Set VITE_GOOGLE_MAPS_API_KEY to enable the map</p>
                        </div>
                    )}
                </div>
            </div>
        </LayoutResolved>
    );
}
