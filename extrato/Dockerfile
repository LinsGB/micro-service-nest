FROM node:lts-slim AS base
RUN apt-get update -y && apt-get install -y openssl 
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
RUN pnpm install @prisma/client

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm install @prisma/client
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
RUN npx prisma generate --schema=./prisma/schema.prisma
EXPOSE 3000
CMD [ "pnpm", "start" ]