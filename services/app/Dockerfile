FROM node:latest

WORKDIR /var/www/asset/app/

ADD package*.json ./

RUN npm install
RUN npm audit fix

ADD . .


EXPOSE 3002
EXPOSE 4001
