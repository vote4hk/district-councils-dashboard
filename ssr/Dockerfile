FROM node:8-alpine AS base

WORKDIR /tmp

# Install app dependencies
COPY . .

RUN npm install

RUN npm run build

# Running the app
CMD [ "npm", "start" ]
