FROM node:alpine AS base

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN node --max_old_space_size=4096 node_modules/.bin/react-scripts build

FROM nginx:latest

COPY --from=base /app/build/ /usr/share/nginx/html

COPY --from=base /app/nginx.conf /etc/nginx/conf.d/default.conf
