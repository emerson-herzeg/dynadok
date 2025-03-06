# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY src ./src
COPY tsconfig.json ./
RUN yarn build

FROM node:18-alpine as runner

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules 
COPY src/infrastructure/config/.env.example ./.env 

CMD ["yarn", "start:prod"]