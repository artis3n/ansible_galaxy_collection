FROM node:16-slim

# Required for python inside Docker containers
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-pip python3-setuptools python3-wheel \
    # Slim down layer size
    && apt-get autoremove -y \
    && apt-get autoclean -y \
    # Remove apt-get cache from the layer to reduce container size
    && rm -rf /var/lib/apt/lists/*
RUN pip3 install --upgrade pip \
    && npm install -g npm

RUN pip3 install ansible
COPY . .
RUN npm ci

ENTRYPOINT ["node", "/app/dist/main.js"]
