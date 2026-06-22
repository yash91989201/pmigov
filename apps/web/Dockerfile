FROM oven/bun:1 AS build
WORKDIR /app
ENV SKIP_ENV_VALIDATION=1
ENV BETTER_AUTH_SECRET=build-time-placeholder-secret-not-used-at-runtime

COPY . .
RUN --mount=type=cache,target=/root/.bun/install/cache bun install
RUN cd apps/web && bun run build

# prod: clean install, no cache mount = real files in node_modules
FROM oven/bun:1
WORKDIR /app
COPY --from=build /app .
RUN rm -rf node_modules apps/*/node_modules packages/*/node_modules \
    && bun install --production

ENV NODE_ENV=production
ENV SKIP_ENV_VALIDATION=
ENV BETTER_AUTH_SECRET=
ENV HOST=0.0.0.0
ENV PORT=3001
EXPOSE 3001

WORKDIR /app/apps/web
CMD ["bun", "run", ".output/server/index.mjs"]
