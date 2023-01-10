FROM node:lts-alpine
LABEL maintainer="Jon Ribeiro <contact@jonathas.com>"

WORKDIR /app

RUN apk update && apk add youtube-dl ffmpeg

CMD [ "node", "youtube-bulk-to-mp3.js" ]