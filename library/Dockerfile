FROM node:20.10-alpine

WORKDIR /usr/app

RUN mkdir -p /usr/app/uploads \
    && chown -R node:node /usr/app/uploads

COPY package*.json ./
RUN npm install
COPY src/ ./src

CMD ["npm", "run", "dev"]