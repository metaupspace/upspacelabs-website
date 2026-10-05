FROM node:20-alpine

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=development

EXPOSE 1337

CMD ["npm", "run", "develop"]
