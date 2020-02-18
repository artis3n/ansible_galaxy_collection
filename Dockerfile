FROM python:slim AS ansible
RUN python -m pip install --upgrade pip
RUN pip install --upgrade ansible

FROM node:slim AS action
COPY . .
RUN npm install --production
ENTRYPOINT ["node", "dist/index.js"]
