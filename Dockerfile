FROM node:10.7.0-alpine
LABEL maintainer="Jon Ribeiro <contact@jonathas.com>"

WORKDIR /app

RUN apk update && apk add tzdata youtube-dl ffmpeg &&\ 
    cp /usr/share/zoneinfo/Europe/Prague /etc/localtime &&\ 
    echo "Europe/Prague" > /etc/timezone &&\ 
    apk del tzdata

CMD [ "node", "youtube-bulk-to-mp3.js" ]