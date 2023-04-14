FROM node:16-alpine
WORKDIR /api
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 18800
CMD ["node","index.js"]