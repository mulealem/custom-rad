FROM node:20-slim

# PhantomJS (used internally by html-pdf) requires some basic fonts & libs; install minimal set
RUN apt-get update && apt-get install -y \
    fontconfig fonts-liberation libfontconfig1 libfreetype6 libjpeg62-turbo \
    libpng16-16 libx11-6 libxext6 libxrender1 libxfont2 libxrandr2 libxtst6 \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json* ./

RUN npm install --production

# Copy source
COPY . .

# Build (if needed) and expose
RUN npm run build

ENV NODE_ENV=production

# Create uploads directory
RUN mkdir -p /app/uploads
VOLUME /app/uploads

EXPOSE 3000

CMD ["node","dist/main.js"]
