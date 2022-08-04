FROM node:16
WORKDIR /usr/src/app
COPY package*.json .
RUN npm cache clean --force && npm i
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "build" ]