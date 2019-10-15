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
COPY . .

RUN npm install

RUN npm run build

# copy production node_modules aside

FROM nginx:latest

COPY --from=base /tmp/build/ /usr/share/nginx/html

COPY --from=base /tmp/nginx.conf /etc/nginx/conf.d/default.conf
