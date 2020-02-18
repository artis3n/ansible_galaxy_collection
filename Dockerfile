FROM node:13-slim
RUN apt-get update
RUN apt-get install -y python3 python3-pip
RUN pip3 install --user ansible
ENV PATH=/root/.local/bin:$PATH
COPY . .
RUN npm install --production
ENTRYPOINT ["node", "dist/index.js"]
