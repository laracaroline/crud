FROM node:7.10 as build-deps

WORKDIR C:\docker

COPY package*.json ./
run npm install

copy . .

expose 3000

cmd ["npm", "start"]