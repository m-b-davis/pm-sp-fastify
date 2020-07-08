# stage: 1
FROM node:12 as react-build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

# stage: 2 — the production environment
FROM nginx:alpine
COPY --from=react-build /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]