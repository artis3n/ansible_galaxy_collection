FROM node:18-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:18-slim AS runner

# Required for python inside Docker containers
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends python3 python3-pip python3-setuptools python3-wheel \
    # Slim down layer size
    && apt-get autoremove -y \
    && apt-get autoclean -y \
    # Remove apt-get cache from the layer to reduce container size
    && rm -rf /var/lib/apt/lists/*

RUN  npm install -g npm \
     && python3 -m pip install --no-cache-dir --upgrade pip

WORKDIR /app

COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir -r requirements.txt

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --production \
    && npm cache clean --force

ENTRYPOINT ["node", "/app/dist/main.js"]
