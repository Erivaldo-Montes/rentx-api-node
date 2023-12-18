FROM node:21

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3333

CMD npm run dev

