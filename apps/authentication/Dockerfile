# apps\authentication\Dockerfile
FROM node:18-alpine AS base
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

ENV NODE_ENV=production
EXPOSE 4001
CMD ["node", "dist/main.js"]
