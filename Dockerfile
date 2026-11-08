# The Lucid Saga website, as Cloud Run runs it: Next.js's standalone server on Node 22, as a
# non-root user, on port 8080. SITE_URL is the address the site lives at, baked into the canonical
# links, sitemap and link previews at build time (infra/deploy.sh passes it).

FROM node:22.23.4-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG SITE_URL=http://localhost:8080
ENV SITE_URL=${SITE_URL}
RUN npm run build

FROM node:22.23.4-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8080 \
    HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 8080
CMD ["node", "server.js"]
