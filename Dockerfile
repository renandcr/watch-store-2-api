FROM node:16

WORKDIR /usr/app

ENV PORT=3001

RUN apt-get update

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3001

USER node

CMD ["yarn", "dev"]