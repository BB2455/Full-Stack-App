FROM node:16
WORKDIR /usr/src/app
COPY package*.json .
RUN npm cache clean --force && npm i --production
COPY . .
EXPOSE 5000
ENV DATABASE_URL=mongodb://mongodb:27017/fullStackDB
CMD [ "npm", "run", "start" ]