FROM node:alpine

ARG PORT=3000

WORKDIR /app

RUN apk update && \
    apk add mysql-client

RUN npm install -g sequelize-cli

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=${PORT}
ENV CLOUDINARY_CLOUD_NAME=cloudinary://312329272668557:lo3x49awaWmoyCFFdcLZYSkseE0@jksusetyo
ENV CLOUDINARY_API_KEY=312329272668557
ENV CLOUDINARY_API_SECRET=lo3x49awaWmoyCFFdcLZYSkseE0
ENV SECRET=bismillah

# RUN sequelize db:drop
# RUN sequelize db:create
RUN sequelize db:migrate
RUN sequelize db:seed

EXPOSE 4000

CMD node app.js

