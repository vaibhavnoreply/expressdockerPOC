FROM node:8 AS base
#RUN apk add --no-cache nodejs-current tini

WORKDIR /usr/src/app

COPY package.json .
COPY . .


FROM base AS test
RUN npm i
#RUN npm run test

FROM base AS PROD
RUN npm i --only=production
EXPOSE 3000
ENTRYPOINT npm start
