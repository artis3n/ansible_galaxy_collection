FROM node:17-slim AS builder

WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM python:3-slim-bullseye

# Required for python inside Docker containers
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

WORKDIR /app

COPY --from=builder /app/dist /app/

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends curl \
    && curl -fsSL https://deb.nodesource.com/setup_17.x | bash - \
    && apt-get install -y nodejs \
    # Slim down layer size
    && apt-get autoremove -y \
    && apt-get autoclean -y \
    # Remove apt-get cache from the layer to reduce container size
    && rm -rf /var/lib/apt/lists/*

RUN  npm install -g npm \
     && python3 -m pip install --no-cache-dir --upgrade pip

COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir -r requirements.txt
COPY package*.json /app/
RUN npm ci --production \
    && npm cache clean --force

ENTRYPOINT ["node", "/app/dist/main.js"]
