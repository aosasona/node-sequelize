# this is written to match caprover requirements (env vars, etc)

FROM node:16-alpine

RUN apk update && apk upgrade && apk add --no-cache git

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/

RUN npm install && npm cache clean --force

COPY . /usr/src/app

RUN npm run build

RUN touch database.sqlite

RUN rm -rf src && rm tsconfig.json # remove dev and source files

RUN npm run migrate #probably don't run your migrations in production like this

ENV PORT 80

ENV JWT_SECRET ${JWT_SECRET}

ENV JWT_EXPIRES_IN ${JWT_EXPIRES_IN}

EXPOSE 80

CMD ["npm", "start"]