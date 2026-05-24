import pinGreen    from '../../assets/map/pins/map-pin-green.png';
import pinBlue     from '../../assets/map/pins/map-pin-blue.png';
import pinPurple   from '../../assets/map/pins/map-pin-purple.png';
import pinRed      from '../../assets/map/pins/map-pin-red.png';
import flagGreen   from '../../assets/map/flags/flag-green.png';
import {
    deviceArrowUrl, incidentFlagUrl, markerColor, useArrow, arrowRotation,
} from '../../lib/map-markers';
import type { MarkerColor, IncidentSeverity } from '../../lib/map-markers';

export type { MarkerColor, IncidentSeverity };

const PIN_URLS: Record<MarkerColor, string> = {
    green:  pinGreen,
    blue:   pinBlue,
    purple: pinPurple,
    red:    pinRed,
};

/** Signal bars → 0–100 percentage the existing `markerColor()` expects. */
function barsToPercent(bars: number): number {
    return Math.max(0, Math.min(4, bars)) * 25;
}

export type MapMarkerIncidentPriority = IncidentSeverity | 'resolved';

export interface MapMarkerProps {
    /**
     * Signal strength as 0–4 bars.
     * 4 = full (green) · 3 = normal (blue) · 2 = low (purple) · 0–1 = almost none (red)
     */
    signal: number;
    /**
     * Bearing in degrees clockwise from north.
     * When provided the arrow icon is shown and rotated to this heading.
     * When absent the static pin icon is shown.
     */
    rotation?: number;
    /**
     * Active incident priority. Shows a flag badge overlaid on the marker.
     * 'resolved' always renders a green flag regardless of prior severity.
     */
    incidentPriority?: MapMarkerIncidentPriority;
    /** Marker size in px (default 40). Flag badge scales proportionally. */
    size?: number;
    className?: string;
}

export function MapMarker({
    signal,
    rotation,
    incidentPriority,
    size = 40,
    className = '',
}: MapMarkerProps) {
    const pct        = barsToPercent(signal);
    const hasHeading = useArrow(rotation);

    const iconSrc = hasHeading
        ? deviceArrowUrl(pct)
        : PIN_URLS[markerColor(pct)];

    const flagSrc = incidentPriority === 'resolved'
        ? flagGreen
        : incidentPriority
            ? incidentFlagUrl(incidentPriority)
            : null;

    const flagSize = Math.round(size * 0.5);

    return (
        <div
            className={`relative inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            <img
                src={iconSrc}
                width={size}
                height={size}
                alt=""
                style={hasHeading && rotation != null ? { transform: arrowRotation(rotation) } : undefined}
                draggable={false}
            />

            {flagSrc && (
                <img
                    src={flagSrc}
                    width={flagSize}
                    height={flagSize}
                    alt=""
                    className="absolute"
                    style={{ top: -Math.round(flagSize * 0.35), right: -Math.round(flagSize * 0.35) }}
                    draggable={false}
                />
            )}
        </div>
    );
}
