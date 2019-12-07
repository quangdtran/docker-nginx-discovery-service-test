FROM node:latest

WORKDIR /var/www/asset/api

ADD package*.json ./

RUN npm install
RUN npm audit fix

ADD . .


EXPOSE 3001
