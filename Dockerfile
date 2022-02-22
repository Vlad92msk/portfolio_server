FROM node:16.13.0-alpine
#RUN apk add git \
#    && git clone https://github.com/Vlad92msk/portfolio_server \
#    && cd portfolio_server \
#    && yarn
WORKDIR ./portfolio_server
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
ADD . .
RUN yarn nest:build
#CMD ["node", "dist/main.js"]
