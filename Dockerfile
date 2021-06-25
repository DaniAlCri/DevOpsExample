FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY server.js ./
ADD www ./www
RUN npm install
RUN npm install --save express 
EXPOSE 8080
COPY server.js .
CMD [ "node", "server.js" ]
