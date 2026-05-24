# ── Stage 1: build Storybook ─────────────────────────────────────────────────
FROM node:22-alpine AS builder

# Install pnpm via npm (reliable in Alpine; lock file requires pnpm v9+)
RUN npm install -g pnpm@9

WORKDIR /app

# Install dependencies first (layer-cached unless lock file changes)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# VITE_ env vars are baked into the static bundle at build time
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}

ARG VITE_GOOGLE_MAPS_LIBRARIES
ENV VITE_GOOGLE_MAPS_LIBRARIES=${VITE_GOOGLE_MAPS_LIBRARIES}

RUN pnpm run build-storybook

# ── Stage 2: serve with nginx ────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runtime

COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Single-page app: route all 404s back to index.html so deep-linked
# story URLs (e.g. /?path=/story/…) work after a hard refresh.
RUN printf 'server {\n\
    listen 80;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80 
