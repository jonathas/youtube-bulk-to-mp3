const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const exec = util.promisify(require('child_process').exec);
const os = require('os');

class YoutubeBulkToMP3 {

    constructor() {
        this._binPath = this._getBinPath();
    }

    _getBinPath() {
        if (os.platform() === 'darwin') {
            return '/opt/homebrew/bin'; // Let's assume we are using homebrew
        } else {
            return '/usr/bin'; // Linux. If you're using Windows, you can run the Docker image
        }
    }

    async download(filePath) {
        const links = await this._loadFile(filePath);
        console.log('Number of items to download: ', links.length);

        for (let i = 0; i < links.length; i++) {
            console.log(`Downloading item ${i + 1} of ${links.length}`);
            await exec(`${this._binPath}/youtube-dl --extract-audio --audio-quality 0 --newline --audio-format mp3 ${links[i]}`);
        }
    }

    async _loadFile(filePath) {
        const data = await readFile(filePath, 'utf8');
        return data.split(',');
    }
}

const yt2mp3 = new YoutubeBulkToMP3();
yt2mp3.download('./music.csv');