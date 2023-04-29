FROM node:18.15-alpine3.16
WORKDIR /usr/server
COPY . .
RUN npm ci --only=production
EXPOSE 8000
EXPOSE 8001
EXPOSE 8002
CMD ["node", "server.js"]
