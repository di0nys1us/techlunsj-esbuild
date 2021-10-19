FROM node:14-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile --silent
COPY . .
RUN yarn build

FROM nginx:1-alpine as runtime
COPY --from=builder /app/public /usr/share/nginx/html
