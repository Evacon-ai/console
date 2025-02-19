# FROM gcr.io/xcuseme-app/xme-build:0.0.1 as ssh

FROM node:22 AS build

# RUN mkdir /root/.ssh
# COPY --from=ssh /root/.ssh /root/.ssh

# RUN chmod 400 -R ~/.ssh

ARG build_env API_WS_URL API_URL APP_DOMAIN APP_URL
ENV BUILD_ENV=$build_env APP_URL=$APP_URL APP_DOMAIN=$APP_DOMAIN API_URL=$API_URL API_WS_URL=$API_WS_URL

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/spa /usr/share/nginx/html