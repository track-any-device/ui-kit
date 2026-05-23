'use client';

import React, { useEffect, useMemo, useState } from 'react';

type EdgeCutoutOptions = {
    threshold?: number; // how white a pixel must be to count as bg
    saturation?: number; // how colorless it must be
    feather?: number; // soften cutout edges
};

type CutoutImageProps = Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'src'
> & {
    src: string;
    enabled?: boolean;
    options?: EdgeCutoutOptions;
};

const cache = new Map<string, Promise<string>>();

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function isNearWhite(
    r: number,
    g: number,
    b: number,
    a: number,
    threshold: number,
    saturation: number,
) {
    if (a === 0) {
        return true;
    }

    const brightness = (r + g + b) / 3;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);

    return brightness >= threshold && chroma <= saturation;
}

async function createEdgeCutout(
    src: string,
    options: EdgeCutoutOptions = {},
): Promise<string> {
    const {
        threshold = 235, // important: lower than pure white so light-gray bg/shadows also get removed
        saturation = 32,
        feather = 24,
    } = options;

    const img = await loadImage(src);

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return src;
    }

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;
    const w = canvas.width;
    const h = canvas.height;

    // Mark only background that is connected to the outer border
    const visited = new Uint8Array(w * h);
    const queueX = new Int32Array(w * h);
    const queueY = new Int32Array(w * h);
    let head = 0;
    let tail = 0;

    const tryPush = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= w || y >= h) {
            return;
        }

        const p = y * w + x;

        if (visited[p]) {
            return;
        }

        const i = p * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (!isNearWhite(r, g, b, a, threshold, saturation)) {
            return;
        }

        visited[p] = 1;
        queueX[tail] = x;
        queueY[tail] = y;
        tail++;
    };

    // Seed flood fill from all outer borders
    for (let x = 0; x < w; x++) {
        tryPush(x, 0);
        tryPush(x, h - 1);
    }

    for (let y = 1; y < h - 1; y++) {
        tryPush(0, y);
        tryPush(w - 1, y);
    }

    while (head < tail) {
        const x = queueX[head];
        const y = queueY[head];
        head++;

        tryPush(x + 1, y);
        tryPush(x - 1, y);
        tryPush(x, y + 1);
        tryPush(x, y - 1);
    }

    // Remove visited background pixels, feathering near edges
    const fadeStart = threshold - feather;

    for (let p = 0; p < visited.length; p++) {
        if (!visited[p]) {
            continue;
        }

        const i = p * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        const brightness = (r + g + b) / 3;

        if (brightness >= threshold) {
            data[i + 3] = 0;
            continue;
        }

        if (brightness > fadeStart) {
            const keep = (threshold - brightness) / feather; // 1 -> keep more, 0 -> remove
            data[i + 3] = Math.round(a * Math.max(0, Math.min(1, keep)));
            continue;
        }

        data[i + 3] = 0;
    }

    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL('image/png');
}

function getCacheKey(src: string, options?: EdgeCutoutOptions) {
    return JSON.stringify([
        src,
        options?.threshold ?? 235,
        options?.saturation ?? 32,
        options?.feather ?? 24,
    ]);
}

function getProcessedSrc(src: string, options?: EdgeCutoutOptions) {
    const key = getCacheKey(src, options);

    if (!cache.has(key)) {
        cache.set(key, createEdgeCutout(src, options));
    }

    return cache.get(key)!;
}

export default function CutoutImage({
    src,
    enabled = true,
    options,
    alt = '',
    ...props
}: CutoutImageProps) {
    const [finalSrc, setFinalSrc] = useState(src);

    const depsKey = useMemo(() => getCacheKey(src, options), [src, options]);

    useEffect(() => {
        let cancelled = false;

        if (!enabled) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFinalSrc(src);

            return;
        }

        getProcessedSrc(src, options)
            .then((result) => {
                if (!cancelled) {
                    setFinalSrc(result);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setFinalSrc(src);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [src, enabled, depsKey]);

    return <img src={finalSrc} alt={alt} {...props} />;
}
