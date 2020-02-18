FROM python:slim AS ansible
RUN python -m pip install --upgrade pip
RUN pip install --user --upgrade ansible

FROM node:slim AS action
COPY . .
COPY --from=ansible /root/.local /root/.local
RUN ln -s $(which python3) /usr/bin/python
ENV PATH=/root/.local/bin:$PATH
RUN npm install --production
ENTRYPOINT ["node", "dist/index.js"]
