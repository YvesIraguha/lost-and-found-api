FROM node:10

RUN mkdir -p /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . . 


