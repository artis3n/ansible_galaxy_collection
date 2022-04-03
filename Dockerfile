FROM node:16-slim

# Required for python inside Docker containers
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

WORKDIR /app

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends python3 python3-pip python3-setuptools \
    # Slim down layer size
    && apt-get autoremove -y \
    && apt-get autoclean -y \
    # Remove apt-get cache from the layer to reduce container size
    && rm -rf /var/lib/apt/lists/*

RUN  npm install -g npm \
     && python3 -m pip install --no-cache-dir --upgrade pip

COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir -r requirements.txt
COPY . .
RUN npm ci --production \
    && npm cache clean --force

ENTRYPOINT ["node", "/app/dist/main.js"]
