import { useEffect, useRef, useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { LayoutResolved } from '../../layouts/LayoutSwitcher';
import type { LayoutName } from '../../layouts/LayoutSwitcher';
import { MapPin, Plus, Users } from 'lucide-react';
import { loadGoogleMaps, hasGoogleMapsKey } from '../../lib/google-maps-loader';

export type LatLng = { lat: number; lng: number };
export type BeatStatus = 'active' | 'inactive';

export interface Beat {
    id: number;
    name: string;
    zone: string;
    description: string;
    status: BeatStatus;
    assignees: number;
    color: string;
    polygon: LatLng[];
}

const STATUS_STYLE: Record<BeatStatus, string> = {
    active:   'text-green-600 border-green-200 bg-green-50',
    inactive: 'text-muted-foreground border-border bg-muted',
};

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

function polygonBounds(maps: typeof google.maps, polygon: LatLng[]): google.maps.LatLngBounds {
    const bounds = new maps.LatLngBounds();
    polygon.forEach((p) => bounds.extend(new maps.LatLng(p.lat, p.lng)));
    return bounds;
}

export function BeatsListContent({ beats }: { beats: Beat[] }) {
    const [selectedId, setSelectedId] = useState<number | null>(beats[0]?.id ?? null);
    const [mapReady, setMapReady] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<google.maps.Map | null>(null);
    const mapsApiRef = useRef<typeof google.maps | null>(null);
    const polysRef = useRef<Map<number, google.maps.Polygon>>(new Map());

    const active   = beats.filter((b) => b.status === 'active').length;
    const inactive = beats.filter((b) => b.status === 'inactive').length;

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

        beats.forEach((beat) => {
            const isSelected = beat.id === selectedId;
            const poly = new maps.Polygon({
                paths: beat.polygon.map((p) => ({ lat: p.lat, lng: p.lng })),
                strokeColor: beat.color,
                strokeWeight: isSelected ? 3 : 1.5,
                fillColor: beat.color,
                fillOpacity: isSelected ? 0.3 : 0.15,
                map: mapRef.current!,
            });
            poly.addListener('click', () => setSelectedId(beat.id));
            polysRef.current.set(beat.id, poly);
        });
    }, [mapReady, beats, selectedId]);

    useEffect(() => {
        if (!mapReady || !mapsApiRef.current || !mapRef.current || selectedId === null) return;
        const beat = beats.find((b) => b.id === selectedId);
        if (!beat || beat.polygon.length === 0) return;
        const bounds = polygonBounds(mapsApiRef.current, beat.polygon);
        mapRef.current.fitBounds(bounds, 60);
    }, [mapReady, selectedId, beats]);

    return (
        <div className="flex h-[calc(100vh-3.5rem)]">
                <div className="flex w-1/3 min-w-[260px] flex-col border-r border-border bg-background overflow-hidden">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3 shrink-0">
                        <div>
                            <h1 className="text-base font-semibold">Beats</h1>
                            <p className="text-xs text-muted-foreground">{beats.length} total</p>
                        </div>
                        <Button size="sm">
                            <Plus className="h-3.5 w-3.5 mr-1" />Add beat
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-border border-b border-border shrink-0">
                        {[
                            { label: 'Total',    value: beats.length },
                            { label: 'Active',   value: active },
                            { label: 'Inactive', value: inactive },
                        ].map(({ label, value }) => (
                            <div key={label} className="px-3 py-2 text-center">
                                <p className="text-lg font-bold text-primary">{value}</p>
                                <p className="text-xs text-muted-foreground">{label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-border">
                        {beats.map((beat) => {
                            const isSelected = beat.id === selectedId;
                            return (
                                <button
                                    key={beat.id}
                                    onClick={() => setSelectedId(beat.id)}
                                    className={`w-full text-left px-4 py-3 hover:bg-muted/40 transition-colors ${isSelected ? 'bg-muted/60' : ''}`}
                                    style={isSelected ? { boxShadow: `inset 3px 0 0 ${beat.color}` } : undefined}
                                >
                                    <div className="flex items-start gap-2.5">
                                        <span
                                            className="mt-0.5 h-3 w-3 rounded-sm shrink-0"
                                            style={{ backgroundColor: beat.color }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-1.5">
                                                <p className="text-sm font-medium truncate">{beat.name}</p>
                                                <Badge variant="outline" className={`text-xs shrink-0 ${STATUS_STYLE[beat.status]}`}>
                                                    {beat.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">{beat.zone}</p>
                                            <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                                                <Users className="h-3 w-3" />
                                                <span>{beat.assignees} assignee{beat.assignees !== 1 ? 's' : ''}</span>
                                            </div>
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
    );
}

export function BeatsListPage({ layout, beats }: { layout: LayoutName; beats: Beat[] }) {
    return (
        <LayoutResolved layout={layout} title="Beats" currentUrl="/beats">
            <BeatsListContent beats={beats} />
        </LayoutResolved>
    );
}

const PRESET_COLORS = [
    { label: 'Green',  value: '#22c55e' },
    { label: 'Blue',   value: '#3b82f6' },
    { label: 'Purple', value: '#a855f7' },
    { label: 'Red',    value: '#ef4444' },
    { label: 'Orange', value: '#f97316' },
];

export function BeatEditorContent({ beat }: { beat?: Partial<Beat> }) {
    const isNew = !beat?.id;

    const [name, setName]             = useState(beat?.name ?? '');
    const [zone, setZone]             = useState(beat?.zone ?? '');
    const [description, setDescription] = useState(beat?.description ?? '');
    const [status, setStatus]         = useState<BeatStatus>(beat?.status ?? 'active');
    const [color, setColor]           = useState(beat?.color ?? '#22c55e');
    const [vertexCount, setVertexCount] = useState(beat?.polygon?.length ?? 0);

    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef       = useRef<google.maps.Map | null>(null);
    const mapsApiRef   = useRef<typeof google.maps | null>(null);
    const polygonRef   = useRef<google.maps.Polygon | null>(null);
    const drawingRef   = useRef<google.maps.drawing.DrawingManager | null>(null);
    const [mapReady, setMapReady]         = useState(false);
    const [isDrawing, setIsDrawing]       = useState(!beat?.polygon?.length);

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

        if (beat?.polygon && beat.polygon.length > 0 && !isDrawing) {
            if (polygonRef.current) polygonRef.current.setMap(null);
            polygonRef.current = new maps.Polygon({
                paths: beat.polygon.map((p) => ({ lat: p.lat, lng: p.lng })),
                strokeColor: color,
                strokeWeight: 2,
                fillColor: color,
                fillOpacity: 0.2,
                editable: true,
                draggable: false,
                map: mapRef.current,
            });
            setVertexCount(beat.polygon.length);
            const bounds = polygonBounds(maps, beat.polygon);
            mapRef.current.fitBounds(bounds, 60);
        }
    }, [mapReady]);

    function activateDrawing() {
        if (!mapsApiRef.current || !mapRef.current) return;
        const maps = mapsApiRef.current;

        if (polygonRef.current) {
            polygonRef.current.setMap(null);
            polygonRef.current = null;
        }
        if (drawingRef.current) {
            drawingRef.current.setMap(null);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dm = new (maps as any).drawing.DrawingManager({
            drawingMode: (maps as any).drawing.OverlayType.POLYGON,
            drawingControl: false,
            polygonOptions: {
                strokeColor: color,
                strokeWeight: 2,
                fillColor: color,
                fillOpacity: 0.2,
                editable: true,
                draggable: false,
            },
            map: mapRef.current,
        });

        maps.event.addListener(dm, 'polygoncomplete', (poly: google.maps.Polygon) => {
            dm.setDrawingMode(null);
            setIsDrawing(false);
            polygonRef.current = poly;
            const path = poly.getPath();
            setVertexCount(path.getLength());
            path.addListener('insert_at', () => setVertexCount(poly.getPath().getLength()));
            path.addListener('remove_at', () => setVertexCount(poly.getPath().getLength()));
            path.addListener('set_at',    () => setVertexCount(poly.getPath().getLength()));
        });

        drawingRef.current = dm;
        setIsDrawing(true);
        setVertexCount(0);
    }

    useEffect(() => {
        if (mapReady && isDrawing && !beat?.polygon?.length) {
            activateDrawing();
        }
    }, [mapReady]);

    useEffect(() => {
        if (!polygonRef.current) return;
        polygonRef.current.setOptions({ strokeColor: color, fillColor: color });
    }, [color]);

    return (
        <div className="flex h-[calc(100vh-3.5rem)]">
                <div className="flex w-[300px] shrink-0 flex-col border-r border-border bg-background overflow-y-auto">
                    <div className="border-b border-border px-4 py-3">
                        <h1 className="text-base font-semibold">{isNew ? 'New Beat' : 'Edit Beat'}</h1>
                    </div>

                    <div className="flex-1 px-4 py-4 space-y-4">
                        <div className="space-y-1.5">
                            <Label className="text-xs">Name</Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Beat name" />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs">Zone</Label>
                            <Input value={zone} onChange={(e) => setZone(e.target.value)} placeholder="Zone or district" />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs">Description</Label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief description…"
                                rows={3}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-xs">Status</Label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as BeatStatus)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs">Color</Label>
                            <div className="flex gap-2 flex-wrap">
                                {PRESET_COLORS.map((c) => (
                                    <label key={c.value} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            name="beat-color"
                                            value={c.value}
                                            checked={color === c.value}
                                            onChange={() => setColor(c.value)}
                                            className="sr-only"
                                        />
                                        <span
                                            className={`block h-6 w-6 rounded-full border-2 transition-all ${color === c.value ? 'border-foreground scale-110' : 'border-transparent'}`}
                                            style={{ backgroundColor: c.value }}
                                            title={c.label}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-md border border-border bg-muted/30 px-3 py-2.5 text-xs text-muted-foreground">
                            Click on the map to draw the beat polygon. Click the first point to close it.
                        </div>

                        <p className="text-xs text-muted-foreground">{vertexCount} {vertexCount === 1 ? 'vertex' : 'vertices'} defined</p>
                    </div>

                    <div className="border-t border-border px-4 py-3 flex gap-2">
                        <Button size="sm" className="flex-1">Save Beat</Button>
                        <Button variant="outline" size="sm">Discard</Button>
                    </div>
                </div>

                <div className="flex-1 relative bg-muted/20">
                    {hasGoogleMapsKey() ? (
                        <>
                            <div ref={containerRef} className="absolute inset-0" />
                            <div className="absolute bottom-4 right-4 z-10">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-background shadow-md"
                                    onClick={activateDrawing}
                                >
                                    Redraw polygon
                                </Button>
                            </div>
                            {isDrawing && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                                    <div className="rounded-md border border-border bg-background/95 px-3 py-1.5 text-xs shadow-md backdrop-blur-sm">
                                        Click to add points · Click the first point to close
                                    </div>
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
    );
}

export function BeatEditorPage({ layout, beat }: { layout: LayoutName; beat?: Partial<Beat> }) {
    const isNew = !beat?.id;
    return (
        <LayoutResolved layout={layout} title={isNew ? 'New Beat' : 'Edit Beat'} currentUrl="/beats/edit">
            <BeatEditorContent beat={beat} />
        </LayoutResolved>
    );
}
