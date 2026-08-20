FROM node:22-alpine AS build
WORKDIR /app

COPY package.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json
RUN npm install && npm install --prefix client && npm install --prefix server

COPY . .
RUN npm run deploy:build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
COPY server/package.json ./server/package.json
RUN npm install --omit=dev --prefix server && npm cache clean --force

COPY --from=build /app/server ./server
COPY --from=build /app/client/dist ./client/dist

EXPOSE 5000
CMD ["npm","run","deploy:start"]
