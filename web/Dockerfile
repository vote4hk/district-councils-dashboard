FROM node:8-alpine AS base

WORKDIR /tmp

# Install app dependencies
COPY . .

RUN apk add --no-cache --virtual .gyp \
  python \
  make \
  g++ &&
  npm install &&
  apk del .gyp

RUN npm run build

# copy production node_modules aside

FROM nginx:latest

COPY --from=base /tmp/build/ /usr/share/nginx/html

COPY --from=base /tmp/nginx.conf /etc/nginx/conf.d/default.conf
