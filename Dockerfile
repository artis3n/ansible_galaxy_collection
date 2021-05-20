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

RUN  npm install -g npm

USER node
ENV PATH="$PATH:/home/node/.local/bin"
RUN python3 -m pip install --upgrade pip \
    && python3 -m pip install --user ansible

COPY . .
# Node needs write privileges inside here, has to come after the COPY
USER root
RUN chown -R node:node /app
USER node
RUN npm ci --production

ENTRYPOINT ["node", "/dist/main.js"]
