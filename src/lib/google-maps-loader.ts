import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

/**
 * Shared Google Maps JS API loader. All map-rendering surfaces
 * (`/map`, `/playback`, `/incidents/{id}`, `/beats/create+edit`,
 * `LocationPlayback`, hero `kind:map` section bg) call `loadGoogleMaps()`
 * which returns the same memoised `Promise<typeof google.maps>`.
 *
 * Uses the v2 functional API (`setOptions` + `importLibrary`) — the
 * legacy `Loader` class is deprecated. setOptions is idempotent and
 * importLibrary triggers the actual script injection on first call.
 *
 * SECURITY: the API key ships in the JS bundle. Restrict it in the
 * Google Cloud Console by HTTP referrer to the platform's central +
 * tenant subdomains so a leaked key can't be abused.
 *
 * COST: every page-view that mounts a map fires one Google Maps map
 * load (billable at ~$7 per 1,000 loads under the Dynamic Maps SKU).
 * Pages that mount a map should gate on `hasGoogleMapsKey()` so dev /
 * test / CI environments without a key render an empty placeholder
 * instead of triggering loader errors.
 *
 * NOTE: Reads from import.meta.env.VITE_GOOGLE_MAPS_API_KEY and
 * import.meta.env.VITE_GOOGLE_MAPS_LIBRARIES — configure these env
 * vars in the consuming app's Vite config.
 */

// import.meta.env is only available in Vite bundles (not Next.js/webpack).
// Read lazily so module evaluation doesn't throw in non-Vite environments.
function getEnv(key: string): string {
    try {
        return (import.meta as unknown as { env?: Record<string, string> }).env?.[key] ?? '';
    } catch {
        return '';
    }
}

const KEY: string = getEnv('VITE_GOOGLE_MAPS_API_KEY');
const EXTRA_LIBS: string = getEnv('VITE_GOOGLE_MAPS_LIBRARIES');

// Libraries we always load:
//   - places   → Autocomplete for beat editor address search
//   - drawing  → DrawingManager + editable Polygon for beat polygon edits
const BASE_LIBRARIES = ['places', 'drawing'];

let initialised = false;
let loaderPromise: Promise<typeof google.maps> | null = null;

/**
 * Returns true when a Google Maps API key is configured. Pages should
 * gate map rendering on this to avoid loader errors in test / CI / dev
 * environments without a key.
 */
export function hasGoogleMapsKey(): boolean {
    return KEY.length > 0;
}

/**
 * Lazy-load the Google Maps JS API. Memoised — every caller after the
 * first await gets the cached resolution.
 *
 * Throws if no key is configured; callers should check `hasGoogleMapsKey()`
 * first and render a fallback when it's false.
 */
export function loadGoogleMaps(): Promise<typeof google.maps> {
    if (!KEY) {
        return Promise.reject(
            new Error(
                'VITE_GOOGLE_MAPS_API_KEY is not set. Maps will not load.',
            ),
        );
    }

    if (loaderPromise) {
        return loaderPromise;
    }

    if (!initialised) {
        const extra = EXTRA_LIBS.split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        const libraries = Array.from(new Set([...BASE_LIBRARIES, ...extra]));

        setOptions({
            key: KEY,
            v: 'weekly',
            libraries,
        });
        initialised = true;
    }

    // importLibrary('maps') triggers the script injection on first call.
    // We don't need the returned namespace itself — once 'maps' has loaded,
    // every google.maps.* member is on the global `google` object, so we
    // return that for callers to destructure as they wish.
    loaderPromise = importLibrary('maps').then(() => google.maps);

    return loaderPromise;
}
