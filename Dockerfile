FROM ghcr.io/astral-sh/uv:python3.14-trixie-slim AS runner

# Required for python inside Docker containers
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Install Node and Python
ARG NODE_MAJOR=24
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends \
       ca-certificates curl gnupg \
    # Install Node.js
    && curl -fsSL "https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key" \
    | gpg --dearmor -o /usr/share/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" \
    > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update && apt-get install -y nodejs \
    # Slim down layer size
    && apt-get autoremove -y \
    && apt-get autoclean -y \
    # Remove apt-get cache from the layer to reduce container size
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm

WORKDIR /app
ARG UV_NO_DEV=1

COPY requirements.txt ./
RUN uv pip install --system --compile-bytecode --no-cache -r requirements.txt
ENV PATH="/app/.venv/bin:$PATH"

COPY src/ /app/src
COPY package*.json ./
RUN npm ci --production \
    && npm cache clean --force

ENTRYPOINT ["node", "--import=tsx", "/app/src/main.ts"]
