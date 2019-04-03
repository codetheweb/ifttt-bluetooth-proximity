FROM node:slim

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install bluetooth bluez bluez-tools -y

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"] 