FROM node:16-alpine as build

WORKDIR /app
COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN npm run build

FROM nginx:stable-alpine3.17-slim
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
