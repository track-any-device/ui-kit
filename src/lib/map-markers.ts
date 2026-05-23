import arrowBlue   from '../assets/map/arrows/map-arrow-blue.png';
import arrowGreen  from '../assets/map/arrows/map-arrow-green.png';
import arrowPurple from '../assets/map/arrows/map-arrow-purple.png';
import arrowRed    from '../assets/map/arrows/map-arrow-red.png';

import flagBlue   from '../assets/map/flags/flag-blue.png';
import flagGreen  from '../assets/map/flags/flag-green.png';
import flagRed    from '../assets/map/flags/flag-red.png';
import flagYellow from '../assets/map/flags/flag-yellow.png';

// ─── Network quality ──────────────────────────────────────────────────────────

/**
 * Four-tier signal classification.
 * Input is a 0–100 percentage (normalise before calling if the device
 * sends a raw dBm or 0–4 bar value).
 *
 * | Tier       | Range  | Colour  |
 * |------------|--------|---------|
 * | none/low   | 0–25   | red     |
 * | above-low  | 26–50  | purple  |
 * | average    | 51–75  | blue    |
 * | good       | 76–100 | green   |
 */
export type NetworkTier = 'none' | 'low' | 'above-low' | 'average' | 'good';
export type MarkerColor = 'red' | 'purple' | 'blue' | 'green';

export function networkTier(signal: number | null | undefined): NetworkTier {
    if (signal == null || signal <= 0) return 'none';
    if (signal <= 25) return 'low';
    if (signal <= 50) return 'above-low';
    if (signal <= 75) return 'average';
    return 'good';
}

/** Maps any signal strength (0–100) to its marker colour. */
export function markerColor(signal: number | null | undefined): MarkerColor {
    const tier = networkTier(signal);
    if (tier === 'none' || tier === 'low') return 'red';
    if (tier === 'above-low') return 'purple';
    if (tier === 'average') return 'blue';
    return 'green';
}

// ─── Arrow markers (device has a known heading) ───────────────────────────────

/** Arrow images keyed by colour. All images point north (up = 0°). */
export const ARROW_URLS: Record<MarkerColor, string> = {
    red:    arrowRed,
    purple: arrowPurple,
    blue:   arrowBlue,
    green:  arrowGreen,
};

/**
 * CSS `transform` string for a north-pointing arrow image.
 * Returns an empty string when heading is unknown (renders the image unrotated,
 * but in practice callers should show a pin instead — see `useArrow`).
 *
 * @param heading - Degrees clockwise from north (0–360).
 */
export function arrowRotation(heading: number | null | undefined): string {
    if (heading == null) return '';
    return `rotate(${(heading % 360 + 360) % 360}deg)`;
}

/**
 * Whether to show an arrow (has heading) or a static pin (no heading).
 * Call this before deciding which marker type to render.
 */
export function useArrow(heading: number | null | undefined): boolean {
    return heading != null;
}

/**
 * Returns the arrow image URL for a device, given its network signal.
 * Only call this when `useArrow(device.heading)` is true.
 */
export function deviceArrowUrl(signal: number | null | undefined): string {
    return ARROW_URLS[markerColor(signal)];
}

// ─── Pin colours (device has no heading) ─────────────────────────────────────

/**
 * Hex fill colours for the static pin marker (rendered as a DOM element,
 * no separate image needed).
 */
export const PIN_COLORS: Record<MarkerColor, string> = {
    red:    '#ef4444',
    purple: '#a855f7',
    blue:   '#3b82f6',
    green:  '#22c55e',
};

/** Returns the hex pin colour for a device, given its network signal. */
export function devicePinColor(signal: number | null | undefined): string {
    return PIN_COLORS[markerColor(signal)];
}

// ─── Incident flags ───────────────────────────────────────────────────────────

/**
 * Incident flags mark the location where an incident was last opened.
 * Colour reflects the incident's priority/severity.
 */
export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low';

export const FLAG_URLS: Record<IncidentSeverity, string> = {
    critical: flagRed,
    high:     flagYellow,
    medium:   flagBlue,
    low:      flagGreen,
};

/** Returns the flag image URL for an incident. */
export function incidentFlagUrl(severity: IncidentSeverity): string {
    return FLAG_URLS[severity];
}

// ─── Named re-exports ─────────────────────────────────────────────────────────

export const arrows = { red: arrowRed, purple: arrowPurple, blue: arrowBlue, green: arrowGreen };
export const flags  = { red: flagRed, yellow: flagYellow, blue: flagBlue, green: flagGreen };
