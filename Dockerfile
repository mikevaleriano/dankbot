FROM node:alpine

WORKDIR /home/node/bot

COPY package.json ./

COPY .env ./

COPY build ./

RUN npm install --only=prod --silent

CMD node -r dotenv/config bot.js
