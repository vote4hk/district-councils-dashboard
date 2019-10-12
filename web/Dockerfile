FROM node:8-alpine AS base

# Build arguments
ARG PUBLIC_URL
ARG NODE_PATH
ARG REACT_APP_GRAPHQL_URI
ARG REACT_APP_GA_TRACKING_ID
ARG REACT_APP_HOST_URI

# check for REACT_APP_HOST_URI. fail the build if no build argument set
RUN if [ -z $REACT_APP_HOST_URI ]; then echo 'build arguments not set' && exit 1; fi

WORKDIR /tmp

# Install app dependencies
COPY package.json .

RUN npm install

WORKDIR /app

RUN ls /tmp

# copy production node_modules aside
RUN cp -R /tmp/node_modules /app/node_modules

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=base /app/build/ /usr/share/nginx/html

COPY --from=base /app/nginx.conf /etc/nginx/conf.d/default.conf
