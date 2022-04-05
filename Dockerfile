FROM node:16

VOLUME /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "start"]