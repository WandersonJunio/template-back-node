# FROM node:14 as devDependencies
# WORKDIR /app
# COPY package.json yarn.* tsconfig.json ./
# COPY . .
# RUN npm install --only=development

# FROM node:14 AS dependencies
# WORKDIR /app
# RUN apt-get update && apt-get -y install cmake
# COPY package.json yarn.* ./
# COPY . .
# RUN npm install --only=production

# FROM node:14 AS builder
# WORKDIR /app
# COPY --from=devDependencies /app/ .
# COPY --from=dependencies /app/ .
# COPY . .
# RUN npm run build

FROM node:14 AS runtime
WORKDIR /app
COPY . .
RUN npm install
# USER node
# COPY --chown=node:node --from=dependencies /app/node_modules /home/node/app/node_modules/
# COPY --from=builder --chown=node:node /app/dist /home/node/app/dist/
# COPY --from=builder --chown=node:node /app/scripts /home/node/app/scripts/
# COPY --from=builder --chown=node:node /app/.env /home/node/app/.env
# COPY --from=builder --chown=node:node /app/ormconfig.js /home/node/app/ormconfig.js
EXPOSE 3000

ENTRYPOINT ["sh", "/home/node/app/scripts/entrypoint.sh"]
