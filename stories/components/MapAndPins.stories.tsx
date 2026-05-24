import type { Meta, StoryObj } from '@storybook/react';
import { MapPin, Wifi, WifiOff } from 'lucide-react';
import type { MiniMapDevice } from '@trackany-device/components';
import { MapMarker } from '../../src/components/devices/map-marker';

/**
 * Map + Pins stories.
 *
 * DevicesMiniMap requires a live Google Maps JS API key (VITE_GOOGLE_MAPS_API_KEY)
 * and a real browser Maps context. These stories render a faithful SVG/canvas
 * mock that shows every visual concept — device pins, online/offline states,
 * clustering, beat boundaries — without needing an API key in Storybook.
 *
 * The real component renders automatically in the full app when the env var
 * is present; the mock here documents the data shape and pin design system.
 */
const meta: Meta = {
    title: 'Components/Devices/MapAndPins',
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
};
export default meta;

// ── Shared mock data ────────────────────────────────────────────────────────

const mockDevices: MiniMapDevice[] = [
    { id: 1,  name: 'Unit 01 – Punjab Police',  imei: '123456789000001', last_lat: 31.5204, last_lon: 74.3587, online: true  },
    { id: 2,  name: 'Unit 02 – Patrol East',    imei: '123456789000002', last_lat: 31.5350, last_lon: 74.3420, online: true  },
    { id: 3,  name: 'Unit 03 – Field Worker',   imei: '123456789000003', last_lat: 31.5100, last_lon: 74.3700, online: false },
    { id: 4,  name: 'Unit 04 – Vehicle Alpha',  imei: '123456789000004', last_lat: 31.5250, last_lon: 74.3800, online: true  },
    { id: 5,  name: 'Unit 05 – Guard Dog',      imei: '123456789000005', last_lat: 31.5070, last_lon: 74.3550, online: false },
    { id: 6,  name: 'No GPS yet',               imei: '123456789000006', last_lat: null,    last_lon: null,    online: false },
];

const beats = [
    { name: 'North Beat',  lat: 31.535, lon: 74.342, radius: 1.2, color: '#3b82f6' },
    { name: 'South Beat',  lat: 31.510, lon: 74.370, radius: 0.9, color: '#10b981' },
    { name: 'East Beat',   lat: 31.525, lon: 74.380, radius: 0.8, color: '#f59e0b' },
];

// ── Pin component used in all map stories ────────────────────────────────────

function DevicePin({
    name, online, x, y, outOfBeat = false,
}: { name: string; online: boolean; x: number; y: number; outOfBeat?: boolean }) {
    const bg    = outOfBeat ? '#ef4444' : online ? '#16a34a' : '#6b7280';
    const pulse = outOfBeat || (!online && false); // pulse only for out-of-beat
    return (
        <g transform={`translate(${x},${y})`}>
            {outOfBeat && (
                <circle r="22" fill={bg} fillOpacity="0.25">
                    <animate attributeName="r" values="18;26;18" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
                </circle>
            )}
            <circle r="18" fill={bg} stroke="white" strokeWidth="2.5" />
            {online
                ? <path d="M0-8L5.6 4H-5.6Z" fill="white" transform="scale(0.7)" />
                : <line x1="-5" y1="-5" x2="5" y2="5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            }
            <text y="30" textAnchor="middle" fontSize="9" fill="#1f2937" fontFamily="system-ui" fontWeight="600"
                style={{ paintOrder: 'stroke' }} stroke="white" strokeWidth="3">
                {name.slice(0, 12)}
            </text>
        </g>
    );
}

function BeatCircle({ name, cx, cy, r, color }: { name: string; cx: number; cy: number; r: number; color: string }) {
    return (
        <g>
            <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5" strokeDasharray="6 3" />
            <text x={cx} y={cy - r - 6} textAnchor="middle" fontSize="10" fill={color} fontFamily="system-ui" fontWeight="600">{name}</text>
        </g>
    );
}

function MapCanvas({ devices, showBeats = false, height = 420 }: {
    devices: MiniMapDevice[];
    showBeats?: boolean;
    height?: number;
}) {
    // Map Lahore region to SVG coords (rough projection)
    const toX = (lon: number) => ((lon - 74.33) / 0.08) * 700 + 60;
    const toY = (lat: number) => ((31.55 - lat) / 0.06) * (height - 80) + 40;

    const positioned = devices.filter(d => d.last_lat !== null && d.last_lon !== null) as
        (MiniMapDevice & { last_lat: number; last_lon: number })[];

    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-border shadow-sm bg-[#e8eaed]"
            style={{ height }}>
            {/* Tile-style background grid */}
            <svg width="100%" height="100%" className="absolute inset-0 opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M40 0L0 0 0 40" fill="none" stroke="#9ca3af" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Main SVG layer */}
            <svg viewBox={`0 0 820 ${height}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0">
                {/* Simulated road lines */}
                <line x1="0" y1={height / 2} x2="820" y2={height / 2} stroke="#c0c0c0" strokeWidth="4" />
                <line x1="410" y1="0" x2="410" y2={height} stroke="#c0c0c0" strokeWidth="3" />
                <line x1="0" y1={height * 0.33} x2="820" y2={height * 0.33} stroke="#d0d0d0" strokeWidth="2" />
                <line x1="0" y1={height * 0.66} x2="820" y2={height * 0.66} stroke="#d0d0d0" strokeWidth="2" />

                {/* Beat overlays */}
                {showBeats && beats.map(b => (
                    <BeatCircle key={b.name} name={b.name}
                        cx={toX(b.lon)} cy={toY(b.lat)}
                        r={b.radius * 100} color={b.color} />
                ))}

                {/* Device pins */}
                {positioned.map((d, i) => {
                    const inBeat = showBeats && beats.some(b => {
                        const dx = toX(d.last_lon) - toX(b.lon);
                        const dy = toY(d.last_lat) - toY(b.lat);
                        return Math.sqrt(dx * dx + dy * dy) < b.radius * 100;
                    });
                    return (
                        <DevicePin key={d.id}
                            name={d.name ?? `Device ${i + 1}`}
                            online={d.online ?? false}
                            x={toX(d.last_lon)} y={toY(d.last_lat)}
                            outOfBeat={showBeats && !inBeat}
                        />
                    );
                })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg shadow p-2.5 text-xs space-y-1 border border-border">
                <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-green-600" /> Inside beat · online</div>
                <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-red-500" /> Out of beat</div>
                <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full bg-gray-500" /> Offline</div>
            </div>

            {/* No-GPS badge */}
            {devices.filter(d => d.last_lat === null).length > 0 && (
                <div className="absolute top-3 right-3 bg-yellow-50 border border-yellow-200 rounded-lg px-2.5 py-1.5 text-xs text-yellow-800">
                    {devices.filter(d => d.last_lat === null).length} device(s) — no GPS fix
                </div>
            )}
        </div>
    );
}

// ── Stories ──────────────────────────────────────────────────────────────────

export const LiveTrackingMap: StoryObj = {
    name: 'Live tracking map — all devices',
    render: () => (
        <div className="p-6 space-y-3">
            <h2 className="font-semibold text-gray-900">Live Monitoring</h2>
            <p className="text-sm text-muted-foreground">6 devices · 4 online · 2 offline · 1 no GPS fix</p>
            <MapCanvas devices={mockDevices} height={480} />
        </div>
    ),
};

export const WithBeatBoundaries: StoryObj = {
    name: 'Map with beat boundaries',
    render: () => (
        <div className="p-6 space-y-3">
            <h2 className="font-semibold text-gray-900">Beat Zone Enforcement</h2>
            <p className="text-sm text-muted-foreground">Red pulsing ring = device outside assigned beat</p>
            <MapCanvas devices={mockDevices} showBeats height={480} />
        </div>
    ),
};

export const PinDesignSystem: StoryObj = {
    name: 'Pin design system',
    render: () => (
        <div className="p-6 space-y-6">
            <h2 className="font-semibold text-gray-900">Device pin variants</h2>
            <div className="flex flex-wrap gap-8 items-end">
                {/* Online in beat */}
                <div className="flex flex-col items-center gap-2">
                    <svg width="60" height="70" viewBox="0 0 60 70">
                        <DevicePin name="Online" online={true} x={30} y={30} />
                    </svg>
                    <p className="text-xs text-green-700 font-medium">Online · in beat</p>
                </div>
                {/* Out of beat */}
                <div className="flex flex-col items-center gap-2">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                        <DevicePin name="Out" online={true} x={40} y={38} outOfBeat />
                    </svg>
                    <p className="text-xs text-red-600 font-medium">Online · out of beat</p>
                </div>
                {/* Offline */}
                <div className="flex flex-col items-center gap-2">
                    <svg width="60" height="70" viewBox="0 0 60 70">
                        <DevicePin name="Offline" online={false} x={30} y={30} />
                    </svg>
                    <p className="text-xs text-gray-500 font-medium">Offline</p>
                </div>
            </div>

            <h2 className="font-semibold text-gray-900 mt-4">Beat boundary colours</h2>
            <div className="flex flex-wrap gap-6">
                {[
                    { label: 'Blue — North beat',  color: '#3b82f6' },
                    { label: 'Green — South beat', color: '#10b981' },
                    { label: 'Amber — East beat',  color: '#f59e0b' },
                    { label: 'Purple',             color: '#8b5cf6' },
                    { label: 'Teal',               color: '#14b8a6' },
                    { label: 'Orange',             color: '#f97316' },
                ].map(b => (
                    <div key={b.label} className="flex items-center gap-2 text-sm">
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="14" fill={b.color} fillOpacity="0.15"
                                stroke={b.color} strokeWidth="2" strokeDasharray="5 3" />
                        </svg>
                        <span>{b.label}</span>
                    </div>
                ))}
            </div>
        </div>
    ),
};

export const MapMarkerDesignSystem: StoryObj = {
    name: 'MapMarker — design system',
    render: () => (
        <div className="p-8 space-y-10 bg-[#e8eaed] min-h-screen">
            <div className="space-y-3">
                <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Signal strength (no direction)</h2>
                <p className="text-xs text-muted-foreground">Static pin · signal 4 → green · 3 → blue · 2 → purple · 0–1 → red</p>
                <div className="flex items-end gap-8">
                    {[
                        { signal: 4, label: '4 bars — full (green)'    },
                        { signal: 3, label: '3 bars — normal (blue)'   },
                        { signal: 2, label: '2 bars — low (purple)'    },
                        { signal: 1, label: '1 bar — almost none (red)'},
                        { signal: 0, label: '0 bars — offline (red)'   },
                    ].map(({ signal, label }) => (
                        <div key={signal} className="flex flex-col items-center gap-2">
                            <MapMarker signal={signal} size={48} />
                            <p className="text-xs text-center text-gray-600 max-w-[80px]">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">With direction (arrow)</h2>
                <p className="text-xs text-muted-foreground">Arrow rotates to heading · same signal → colour mapping</p>
                <div className="flex items-end gap-8">
                    {[
                        { signal: 4, rotation: 0,   label: '0° North (green)'  },
                        { signal: 3, rotation: 90,  label: '90° East (blue)'   },
                        { signal: 2, rotation: 180, label: '180° South (purple)'},
                        { signal: 1, rotation: 270, label: '270° West (red)'   },
                        { signal: 3, rotation: 45,  label: '45° NE (blue)'     },
                    ].map(({ signal, rotation, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <MapMarker signal={signal} rotation={rotation} size={48} />
                            <p className="text-xs text-center text-gray-600 max-w-[80px]">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Incident flag overlay</h2>
                <p className="text-xs text-muted-foreground">Flag colour = incident priority · green flag = resolved</p>
                <div className="flex items-end gap-8">
                    {[
                        { signal: 4, incidentPriority: 'critical' as const, label: 'Critical (red flag)'   },
                        { signal: 3, incidentPriority: 'high'     as const, label: 'High (yellow flag)'    },
                        { signal: 3, incidentPriority: 'medium'   as const, label: 'Medium (blue flag)'    },
                        { signal: 2, incidentPriority: 'low'      as const, label: 'Low (green flag)'      },
                        { signal: 4, incidentPriority: 'resolved' as const, label: 'Resolved (green flag)' },
                    ].map(({ signal, incidentPriority, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <MapMarker signal={signal} incidentPriority={incidentPriority} size={48} />
                            <p className="text-xs text-center text-gray-600 max-w-[80px]">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Arrow + incident flag</h2>
                <p className="text-xs text-muted-foreground">Moving devices with active incidents</p>
                <div className="flex items-end gap-8">
                    {[
                        { signal: 4, rotation: 45,  incidentPriority: 'critical' as const, label: 'NE · critical' },
                        { signal: 3, rotation: 90,  incidentPriority: 'high'     as const, label: 'E · high'      },
                        { signal: 2, rotation: 200, incidentPriority: 'medium'   as const, label: 'SSW · medium'  },
                        { signal: 4, rotation: 315, incidentPriority: 'resolved' as const, label: 'NW · resolved' },
                    ].map(({ signal, rotation, incidentPriority, label }) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <MapMarker signal={signal} rotation={rotation} incidentPriority={incidentPriority} size={48} />
                            <p className="text-xs text-center text-gray-600 max-w-[80px]">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ),
};

export const EmptyMap: StoryObj = {
    name: 'Empty — no GPS fixes',
    render: () => (
        <div className="p-6 space-y-3">
            <h2 className="font-semibold text-gray-900">No device locations</h2>
            <MapCanvas devices={[
                { id: 1, name: 'Device A', imei: '111', last_lat: null, last_lon: null, online: false },
                { id: 2, name: 'Device B', imei: '222', last_lat: null, last_lon: null, online: false },
            ]} height={320} />
        </div>
    ),
};

export const MiniMapPreview: StoryObj = {
    name: 'DevicesMiniMap — compact variant',
    render: () => (
        <div className="p-6 space-y-3 max-w-lg">
            <h2 className="font-semibold text-gray-900">Dashboard mini-map</h2>
            <p className="text-xs text-muted-foreground">
                The real <code>DevicesMiniMap</code> component renders here when
                <code>VITE_GOOGLE_MAPS_API_KEY</code> is set. This preview shows the same
                device data at the compact size used on the central dashboard.
            </p>
            <MapCanvas devices={mockDevices.slice(0, 4)} height={240} />
        </div>
    ),
};
