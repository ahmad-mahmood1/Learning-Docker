FROM node:18-alpine

WORKDIR /dockerApp

COPY package* .

RUN yarn

COPY . .

CMD ["node", "index.js"]
EXPOSE 3000