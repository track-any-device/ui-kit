'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import CutoutImage from './cutout-image';

type LayerStyle = React.CSSProperties & {
    '--mx'?: string;
    '--my'?: string;
    '--delay'?: string;
    '--float'?: string;
};

type AssetKey =
    | 'background'
    | 'monitor'
    | 'phone'
    | 'truck'
    | 'pickup'
    | 'van'
    | 'satellite'
    | 'cloud'
    | 'pin';

type FleetHeroAnimatedProps = {
    className?: string;
    assetBasePath?: string;
};

const defaultAssets: Record<AssetKey, string> = {
    background: 'bg.png',
    monitor: 'pc.png',
    phone: 'mobile.png',
    truck: 'truck.png',
    pickup: 'hilux.png',
    van: 'van.png',
    satellite: 'satellite.png',
    cloud: 'cloud.png',
    pin: 'pin.png',
};

function joinPath(base: string, file: string) {
    return `${base.replace(/\/$/, '')}/${file}`;
}

export default function FleetHeroAnimated({
    className = '',
    assetBasePath = '/elements-slider',
}: FleetHeroAnimatedProps) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const [pointer, setPointer] = useState({ x: 0, y: 0 });
    const [loaded, setLoaded] = useState(false);

    const assets = useMemo(() => {
        return Object.fromEntries(
            Object.entries(defaultAssets).map(([key, value]) => [
                key,
                joinPath(assetBasePath, value),
            ]),
        ) as Record<AssetKey, string>;
    }, [assetBasePath]);

    useEffect(() => {
        const timers = window.setTimeout(() => setLoaded(true), 120);

        return () => window.clearTimeout(timers);
    }, []);

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        setPointer({ x, y });
    };

    const resetPointer = () => setPointer({ x: 0, y: 0 });

    const parallax = (depth: number): LayerStyle => ({
        '--mx': `${pointer.x * depth}px`,
        '--my': `${pointer.y * depth}px`,
    });

    return (
        <section
            ref={wrapRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            className={`relative isolate mx-auto flex w-full justify-center overflow-hidden bg-white ${className}`}
            aria-label="Fleet, Employee and Assets Tracking and Attendance System"
        >
            <style>{styles}</style>

            <div
                className={`fleet-hero relative aspect-[561/701] w-full max-w-[1122px] overflow-hidden bg-white transition-opacity duration-700 ${
                    loaded ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <img
                    src={assets.background}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[24%] bg-gradient-to-b from-white via-white/90 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[10%] bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[10%] bg-gradient-to-l from-white to-transparent" />

                <div className="absolute inset-x-[3%] top-[2.8%] z-30 text-center">
                    <div className="mx-auto mb-[1.6%] inline-flex items-center rounded-full border border-emerald-100 bg-white/80 px-4 py-1.5 text-[clamp(10px,1.35vw,15px)] font-semibold text-emerald-800 shadow-sm backdrop-blur">
                        Smart Operations Platform
                    </div>

                    <h1 className="mx-auto max-w-[920px] text-[clamp(18px,3.1vw,64px)] leading-[0.96] font-black tracking-[-0.045em] text-balance text-neutral-950">
                        <span className="block">
                            Fleet, Employee &amp; Assets
                        </span>
                        <span className="block pt-[1.4%]">
                            <span className="text-emerald-700">Tracking</span>
                            <span className="font-extrabold text-neutral-950">
                                {' '}
                                and{' '}
                            </span>
                            <span className="text-emerald-700">
                                Attendance System
                            </span>
                        </span>
                    </h1>

                    <p className="mx-auto mt-[2%] max-w-[780px] text-[clamp(12px,1.55vw,18px)] leading-relaxed font-medium text-balance text-neutral-500">
                        Real-time monitoring. Workforce visibility. Asset
                        oversight. Attendance insights.
                    </p>

                    <div className="mx-auto mt-[2.5%] h-[3px] w-[15%] rounded-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-red-500" />

                    <div className="mx-auto mt-[3.2%] grid max-w-[720px] grid-cols-4 gap-[clamp(8px,2vw,28px)] px-[3%]">
                        <FeatureIcon icon="⌖" label="Live Tracking" />
                        <FeatureIcon icon="●✓" label="Attendance" />
                        <FeatureIcon icon="▣" label="Asset Monitoring" />
                        <FeatureIcon icon="◉" label="Incident Alerts" />
                    </div>
                </div>

                <div className="absolute top-[54%] left-[1.4%] z-30 w-[47%]">
                    <CutoutImage
                        src={assets.monitor}
                        alt="Fleet dashboard overview"
                        className="fleet-layer fleet-layer-monitor block w-full object-contain drop-shadow-2xl select-none"
                        style={parallax(-7)}
                        draggable={false}
                    />
                </div>

                <div className="absolute top-[64.5%] left-[35.5%] z-50 w-[16.5%]">
                    <CutoutImage
                        src={assets.phone}
                        alt="Live monitoring mobile app"
                        className="fleet-layer fleet-layer-phone block w-full object-contain drop-shadow-2xl select-none"
                        style={parallax(11)}
                        draggable={false}
                    />
                </div>

                <CutoutImage
                    src={assets.van}
                    alt="Service van"
                    className="fleet-layer fleet-layer-van absolute top-[60%] left-[50.5%] z-20 w-[20%] object-contain opacity-95 drop-shadow-xl select-none"
                    style={parallax(-3)}
                    draggable={false}
                />

                <CutoutImage
                    src={assets.truck}
                    alt="Sanitation fleet truck"
                    className="fleet-layer fleet-layer-truck absolute top-[62%] right-[3.5%] z-40 w-[20%] object-contain drop-shadow-2xl select-none"
                    style={parallax(5)}
                    draggable={false}
                />

                <CutoutImage
                    src={assets.pickup}
                    alt="Utility pickup vehicle"
                    className="fleet-layer fleet-layer-pickup absolute top-[70.2%] right-[25.5%] z-60 w-[24%] object-contain drop-shadow-2xl select-none"
                    style={parallax(13)}
                    draggable={false}
                />

                <CutoutImage
                    src={assets.satellite}
                    alt=""
                    className="fleet-layer fleet-layer-satellite absolute top-[40%] right-[11.5%] z-30 w-[10%] object-contain drop-shadow-lg select-none"
                    style={parallax(18)}
                    draggable={false}
                />

                <CutoutImage
                    src={assets.cloud}
                    alt=""
                    className="fleet-layer fleet-layer-cloud absolute top-[44%] right-[24%] z-30 w-[8%] object-contain drop-shadow-lg select-none"
                    style={parallax(10)}
                    draggable={false}
                />

                <CutoutImage
                    src={assets.pin}
                    alt=""
                    className="fleet-layer fleet-layer-pin-left absolute top-[79.6%] left-[7%] z-40 w-[7%] object-contain drop-shadow-xl select-none"
                    style={parallax(16)}
                    draggable={false}
                />

                <CutoutImage
                    src={assets.pin}
                    alt=""
                    className="fleet-layer fleet-layer-pin-right absolute top-[78.5%] right-[4.5%] z-40 w-[7%] object-contain drop-shadow-xl select-none"
                    style={parallax(15)}
                    draggable={false}
                />

                <div className="absolute inset-x-[6.5%] bottom-[3.8%] z-70 grid grid-cols-4 overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 px-[2%] py-[1.8%] text-white shadow-2xl shadow-emerald-900/20 max-sm:rounded-2xl">
                    <Benefit icon="🛡" title="Secure & Reliable" />
                    <Benefit icon="◷" title="Real-time Monitoring" />
                    <Benefit icon="⚙" title="Optimized Operations" />
                    <Benefit icon="👥" title="Better Public Services" />
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-80 h-[5%] bg-gradient-to-t from-white via-white/70 to-transparent" />
            </div>
        </section>
    );
}

function FeatureIcon({ icon, label }: { icon: string; label: string }) {
    return (
        <div className="group flex flex-col items-center gap-2 text-center">
            <div className="grid aspect-square w-[clamp(42px,5.2vw,62px)] place-items-center rounded-full border border-emerald-200 bg-white/80 text-[clamp(17px,2.2vw,28px)] font-black text-emerald-700 shadow-sm backdrop-blur transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                {icon}
            </div>
            <span className="text-[clamp(9px,1.1vw,13px)] leading-tight font-bold text-neutral-800">
                {label}
            </span>
        </div>
    );
}

function Benefit({ icon, title }: { icon: string; title: string }) {
    return (
        <div className="flex min-w-0 items-center justify-center gap-[8%] border-r border-white/25 px-[3%] last:border-r-0">
            <span className="text-[clamp(18px,3vw,34px)] leading-none opacity-95">
                {icon}
            </span>
            <span className="max-w-[110px] text-[clamp(9px,1.45vw,17px)] leading-tight font-bold">
                {title}
            </span>
        </div>
    );
}

const styles = `
.fleet-layer {
  --mx: 0px;
  --my: 0px;
  --delay: 0ms;
  --float: 8px;
  transform: translate3d(var(--mx), var(--my), 0);
  transition: transform 180ms ease-out;
  will-change: transform;
}

.fleet-hero {
  transform: translateZ(0);
}

.fleet-hero::before {
  content: "";
  position: absolute;
  inset: 40% 5% 8% 5%;
  background:
    radial-gradient(circle at 24% 82%, rgba(16, 185, 129, .16), transparent 18%),
    radial-gradient(circle at 74% 65%, rgba(16, 185, 129, .13), transparent 20%);
  pointer-events: none;
  z-index: 10;
}

.fleet-hero::after {
  content: "";
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 15.5%;
  height: 22%;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(34, 197, 94, .32), transparent);
  filter: blur(22px);
  opacity: .65;
  z-index: 15;
  pointer-events: none;
}

.fleet-layer-monitor { animation: fleetRise 850ms cubic-bezier(.2,.8,.2,1) both, fleetFloat 7s ease-in-out 900ms infinite; }
.fleet-layer-phone { animation: fleetRise 950ms cubic-bezier(.2,.8,.2,1) 90ms both, fleetFloatPhone 5.5s ease-in-out 1050ms infinite; }
.fleet-layer-van { animation: fleetDriveIn 900ms cubic-bezier(.2,.8,.2,1) 170ms both, fleetFloat 8s ease-in-out 1200ms infinite; }
.fleet-layer-truck { animation: fleetDriveIn 950ms cubic-bezier(.2,.8,.2,1) 240ms both, fleetFloatTruck 6.5s ease-in-out 1300ms infinite; }
.fleet-layer-pickup { animation: fleetDriveIn 900ms cubic-bezier(.2,.8,.2,1) 320ms both, fleetFloatPickup 5.8s ease-in-out 1400ms infinite; }
.fleet-layer-satellite { animation: fleetSatelliteIn 1000ms cubic-bezier(.2,.8,.2,1) 420ms both, fleetOrbit 8s ease-in-out 1500ms infinite; transform-origin: 55% 45%; }
.fleet-layer-cloud { animation: fleetPop 700ms cubic-bezier(.2,.9,.2,1) 520ms both, fleetFloat 6s ease-in-out 1250ms infinite; }
.fleet-layer-pin-left, .fleet-layer-pin-right { animation: fleetPinDrop 800ms cubic-bezier(.2,.8,.2,1) 550ms both, fleetPulse 2.5s ease-in-out 1450ms infinite; }

@keyframes fleetRise {
  from { opacity: 0; transform: translate3d(calc(var(--mx) - 12px), calc(var(--my) + 42px), 0) scale(.96); filter: blur(8px); }
  to { opacity: 1; transform: translate3d(var(--mx), var(--my), 0) scale(1); filter: blur(0); }
}

@keyframes fleetDriveIn {
  from { opacity: 0; transform: translate3d(calc(var(--mx) + 64px), calc(var(--my) + 28px), 0) scale(.94); filter: blur(7px); }
  to { opacity: 1; transform: translate3d(var(--mx), var(--my), 0) scale(1); filter: blur(0); }
}

@keyframes fleetSatelliteIn {
  from { opacity: 0; transform: translate3d(calc(var(--mx) + 38px), calc(var(--my) - 28px), 0) rotate(-14deg) scale(.82); filter: blur(7px); }
  to { opacity: 1; transform: translate3d(var(--mx), var(--my), 0) rotate(0deg) scale(1); filter: blur(0); }
}

@keyframes fleetPop {
  from { opacity: 0; transform: translate3d(var(--mx), var(--my), 0) scale(.65); }
  to { opacity: 1; transform: translate3d(var(--mx), var(--my), 0) scale(1); }
}

@keyframes fleetPinDrop {
  0% { opacity: 0; transform: translate3d(var(--mx), calc(var(--my) - 40px), 0) scale(.85); }
  70% { opacity: 1; transform: translate3d(var(--mx), calc(var(--my) + 5px), 0) scale(1.04); }
  100% { opacity: 1; transform: translate3d(var(--mx), var(--my), 0) scale(1); }
}

@keyframes fleetFloat {
  0%,100% { translate: 0 0; }
  50% { translate: 0 -7px; }
}
@keyframes fleetFloatPhone {
  0%,100% { translate: 0 0; rotate: 0deg; }
  50% { translate: 0 -10px; rotate: .5deg; }
}
@keyframes fleetFloatTruck {
  0%,100% { translate: 0 0; }
  50% { translate: -4px -6px; }
}
@keyframes fleetFloatPickup {
  0%,100% { translate: 0 0; }
  50% { translate: 5px -8px; }
}
@keyframes fleetOrbit {
  0%,100% { translate: 0 0; rotate: 0deg; }
  50% { translate: 9px -9px; rotate: 2.5deg; }
}
@keyframes fleetPulse {
  0%,100% { scale: 1; filter: drop-shadow(0 10px 14px rgba(220,38,38,.22)); }
  50% { scale: 1.06; filter: drop-shadow(0 16px 22px rgba(220,38,38,.34)); }
}

@media (max-width: 640px) {
  .fleet-layer-monitor { left: -3% !important; top: 49% !important; width: 53% !important; }
  .fleet-layer-phone { left: 39% !important; top: 58% !important; width: 18.5% !important; }
  .fleet-layer-truck { right: -1% !important; top: 61% !important; width: 45% !important; }
  .fleet-layer-pickup { right: 22% !important; top: 72% !important; width: 37% !important; }
  .fleet-layer-van { left: 50% !important; top: 64% !important; width: 26% !important; }
}

@media (prefers-reduced-motion: reduce) {
  .fleet-layer,
  .fleet-layer-monitor,
  .fleet-layer-phone,
  .fleet-layer-van,
  .fleet-layer-truck,
  .fleet-layer-pickup,
  .fleet-layer-satellite,
  .fleet-layer-cloud,
  .fleet-layer-pin-left,
  .fleet-layer-pin-right {
    animation: none !important;
    transition: none !important;
  }
}
`;
