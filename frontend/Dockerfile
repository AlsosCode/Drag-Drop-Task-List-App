# Multi-stage build for production
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
