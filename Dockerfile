FROM node:16

ENV PORT=3000

RUN apt-get update

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

USER node

CMD ["yarn", "dev"]