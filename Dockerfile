FROM node:24-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM debian:13-slim AS runner

# Required for python inside Docker containers
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Install Node and Python
ARG NODE_MAJOR=24
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends \
       ca-certificates curl \
       python3 python3-pip python3-setuptools python3-wheel \
    # Install Node.js
    && curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}".x | bash - \
    && apt-get update && apt-get install -y nodejs \
    # Slim down layer size
    && apt-get autoremove -y \
    && apt-get autoclean -y \
    # Remove apt-get cache from the layer to reduce container size
    && rm -rf /var/lib/apt/lists/*

RUN  npm install -g npm

WORKDIR /app

COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir --break-system-packages -r requirements.txt

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --production \
    && npm cache clean --force

ENTRYPOINT ["node", "/app/dist/main.js"]
