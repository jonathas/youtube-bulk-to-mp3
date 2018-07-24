# Youtube bulk to MP3

This is a script that runs on Node.js, [youtube-dl](https://rg3.github.io/youtube-dl/) and [ffmpeg](https://ffmpeg.org/) to download a list of videos from Youtube and convert them to mp3.

In order to run it, you need to either:

1) Have youtube-dl and ffmpeg installed on your OS

2) Or you can build a Docker image from the provided Dockerfile by running it with [docker-compose](https://docs.docker.com/compose/install/):

```bash
docker-compose up
```
