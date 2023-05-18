FROM node:18-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/moviedb/ /usr/share/nginx/html


# Stage 1
# FROM node:18-alpine

# RUN mkdir /home/node/app && chown node:node /home/node/app
# RUN mkdir /home/node/app/node_modules && chown node:node /home/node/app/node_modules
# WORKDIR  /home/node/app
# USER node
# COPY --chown=node:node package.json package-lock.json ./
# RUN npm ci --quiet
# COPY --chown=node:node . .

# # max_old_space_size is optional but can help when you have a lot of modules
# RUN node --max_old_space_size=4096 node_modules/.bin/ng build --prod

# # Stage 2
# # Using a light-weight nginx image
# FROM nginx:alpine

# COPY --from=node /home/node/app/dist/moviedb /usr/share/nginx/html
# COPY --from=node /home/node/app/.docker/nginx.conf /etc/nginx/conf.d/default.conf