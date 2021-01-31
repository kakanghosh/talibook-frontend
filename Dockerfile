FROM node:14.15.4-alpine AS appbuild

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN npm run build

FROM node:14.15.4-alpine AS production
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY --from=appbuild /app/node_modules ./node_modules
COPY --from=appbuild /app/.next ./.next

EXPOSE 3000

CMD npm start
