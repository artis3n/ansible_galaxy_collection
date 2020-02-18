FROM ubuntu:rolling
RUN apt update
RUN apt install -y python3 python3-pip nodejs
RUN pip3 install --user ansible
ENV PATH=/root/.local/bin:$PATH
COPY . .
RUN npm install --production
ENTRYPOINT ["node", "dist/index.js"]
