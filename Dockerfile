# # Dockerfile
# FROM node:12.16.2-alpine

# # create destination directory
# RUN mkdir -p /usr/src/nuxt_app
# WORKDIR /usr/src/nuxt_app

# # update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# # copy the app, note .dockerignore
# COPY . /usr/src/nuxt_app/
# RUN yarn install
# # RUN yarn run build

# EXPOSE 3000

# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

# CMD [ "yarn", "run", "dev" ]
###======================
# Image
FROM node:12.18.2-alpine

# create destination directory
RUN mkdir /app
WORKDIR /app

# start the app
# CMD ["yarn", "run" , "dev"]