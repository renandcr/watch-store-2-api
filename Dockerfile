FROM node:16

ENV PORT=3001

RUN apt-get update

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3001

USER node

CMD ["yarn", "dev"]