FROM node:20.17-alpine as builder
COPY ./ /app
WORKDIR /app
RUN yarn && yarn build

FROM nginx:alpine
RUN mkdir /app
COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]