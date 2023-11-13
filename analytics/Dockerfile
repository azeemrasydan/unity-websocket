FROM node:18.10.0-alpine3.15
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g rimraf
CMD ["npm", "run", "start"]
EXPOSE 8080