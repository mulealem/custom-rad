###########################
# Build Stage
###########################
FROM node:22-slim AS build
WORKDIR /app

# Install dependencies (include dev for build & Nest compilation)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source (ts, prisma, config)
COPY tsconfig*.json nest-cli.json .prettierrc .eslint* ./
COPY prisma ./prisma
COPY src ./src

# Build (runs prisma generate via package script) & prune dev deps after build
RUN npm run build && npm prune --omit=dev

###########################
# Runtime Stage
###########################
FROM node:22-slim AS runtime
WORKDIR /app

# Install system packages required by headless Chromium (Puppeteer)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnss3 libnspr4 \
    libpango-1.0-0 \
    libx11-6 libx11-xcb1 libxcb1 \
    libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libxshmfence1 \
    libxext6 \
    libxss1 \
    libfreetype6 libjpeg62-turbo libpng16-16 \
    && rm -rf /var/lib/apt/lists/*

# Copy production node_modules & dist from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY package.json package-lock.json* ./

# Ensure uploads directory exists & persists
RUN mkdir -p /app/uploads
VOLUME /app/uploads

ENV NODE_ENV=production \
    # Prevent Puppeteer from downloading Chromium again; we reuse the one from node_modules/.cache
    PUPPETEER_SKIP_DOWNLOAD=1

EXPOSE 3000

CMD ["node","dist/main.js"]
