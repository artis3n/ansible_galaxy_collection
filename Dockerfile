FROM node:13-slim
RUN apt-get update

# Required for python inside Docker containers
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8

RUN apt-get install -y python python-pip
RUN pip install --upgrade pip ansible
COPY . .
RUN npm install --production
ENTRYPOINT ["node", "dist/index.js"]
