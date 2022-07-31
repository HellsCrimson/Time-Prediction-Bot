FROM node:lts-alpine3.16

WORKDIR /app
COPY . .
RUN npm install

CMD ["npm", "start"]