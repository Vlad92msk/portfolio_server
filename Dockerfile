FROM alpine
RUN apk add git \
    && apk add yarn \
    && git clone https://github.com/Vlad92msk/portfolio_server.git \
    && cd ./portfolio_server \
    && yarn install --production \
    && yarn nest:build

WORKDIR ./portfolio_server
CMD ["node", "dist/main.js"]

EXPOSE ${SERVER_PORT}
