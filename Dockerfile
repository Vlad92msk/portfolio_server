FROM node:16.13.0-alpine
RUN apk add git \
    && git clone https://github.com/Vlad92msk/portfolio_server \
    && yarn

WORKDIR ./server
RUN yarn build
CMD ["node", "dist/main.js"]
