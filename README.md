# Youtube bulk to MP3

This is a script that runs on Node.js, [youtube-dl](https://rg3.github.io/youtube-dl/) and [ffmpeg](https://ffmpeg.org/) to download a list of videos from Youtube and convert them to mp3.

In order to run it, you need to either:

1) Have Node.js, youtube-dl and ffmpeg installed on your OS and run it with:

```bash
node youtube-bulk-to-mp3.js
```

2) Or you can build a [Docker](https://www.docker.com/) image from the provided Dockerfile by running it with [docker-compose](https://docs.docker.com/compose/install/):

```bash
docker-compose up
```
