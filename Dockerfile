FROM alpine
RUN apk add git \
    && apk add yarn \
    && git clone https://github.com/Vlad92msk/FullStackApp_v2.git \
    && cd ./FullStackApp_v2/server \
    && yarn \
    && yarn nest:build

WORKDIR ./FullStackApp_v2/server
CMD ["node", "dist/main.js"]

EXPOSE ${SERVER_PORT}
