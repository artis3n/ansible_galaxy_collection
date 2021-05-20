FROM node:16-slim

# Required for python inside Docker containers
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

WORKDIR /app

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends python3 python3-pip python3-setuptools python3-wheel \
    # Slim down layer size
    && apt-get autoremove -y \
    && apt-get autoclean -y \
    # Remove apt-get cache from the layer to reduce container size
    && rm -rf /var/lib/apt/lists/*

RUN  npm install -g npm \
    && python3 -m pip install --upgrade pip

COPY requirements.txt ./
RUN python3 -m pip install -r requirements.txt
COPY . .
RUN npm ci --production

ENTRYPOINT ["node", "/app/dist/main.js"]
