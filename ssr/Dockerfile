FROM node:12-alpine AS base

WORKDIR /tmp

# Install app dependencies
COPY package.json .

RUN npm install

RUN cp -R node_modules node_modules_dev

RUN npm install --only=prod

FROM node:12-alpine AS build

WORKDIR /tmp

COPY . .

COPY --from=base /tmp/node_modules_dev node_modules

RUN npm run build

FROM node:12-alpine

WORKDIR app

COPY . .

COPY --from=base /tmp/node_modules node_modules

COPY --from=build /tmp/.express .express

COPY --from=build /tmp/.next .next

# Running the app
CMD [ "npm", "start" ]
