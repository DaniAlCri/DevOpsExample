FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
ADD app ./
RUN npm install
EXPOSE 8080
COPY server.js .
CMD [ "node", "server.js" ]
