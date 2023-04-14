FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#EXPOSE 3000
#CMD ["npm","start"]
FROM nginx:1.15
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/build/ /usr/share/nginx/html
