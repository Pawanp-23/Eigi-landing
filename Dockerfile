FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite embeds this optional public measurement ID into the built JavaScript.
ARG VITE_GA_ID=""
RUN VITE_GA_ID="$VITE_GA_ID" npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 82

CMD ["nginx", "-g", "daemon off;"]
