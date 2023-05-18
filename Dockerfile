FROM node:18-alpine

WORKDIR /user/app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm install

RUN npm build

#Serve app with nginx

FROM nginx:alpine
COPY --from=node /app/dist/moviedb /usr/share/nginx/html