# Backend Dockerfile with Puppeteer for PDF generation
FROM node:20-slim

# Install dependencies required by Chromium
RUN apt-get update && apt-get install -y \
    ca-certificates fonts-liberation libasound2 libatk1.0-0 libatk-bridge2.0-0 \
    libatspi2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libdrm2 libexpat1 \
    libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
    libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 \
    libxrender1 libxss1 libxtst6 wget xdg-utils libu2f-udev libvulkan1 \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json* ./

# Install node dependencies (include puppeteer which downloads Chromium)
RUN npm install --production

# Copy source
COPY . .

# Build (if needed) and expose
RUN npm run build

ENV NODE_ENV=production \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false \
    PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

# Create uploads directory
RUN mkdir -p /app/uploads
VOLUME /app/uploads

EXPOSE 3000

CMD ["node","dist/main.js"]
