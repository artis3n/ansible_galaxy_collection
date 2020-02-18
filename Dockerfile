FROM python:2-slim AS ansible
RUN python -m pip install --upgrade pip
RUN pip install --user --upgrade ansible

FROM node:slim AS action
COPY . .
COPY --from=ansible /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH
RUN npm install --production
ENTRYPOINT ["node", "dist/index.js"]


#FROM node:13-slim
#RUN apt-get update
#
## Required for python inside Docker containers
#ENV LC_ALL C.UTF-8
#ENV LANG C.UTF-8
#
#RUN apt-get install -y python python-pip
#RUN pip install --upgrade pip ansible
#COPY . .
#RUN npm install --production
#ENTRYPOINT ["node", "dist/index.js"]
