FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

WORKDIR /app/db

COPY db/package.json db/yarn.lock ./

RUN yarn install

ENV environment=production

EXPOSE 3000

CMD ["yarn","start"]
