const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const exec = util.promisify(require('child_process').exec);

class YoutubeBulkToMP3 {

    async download(filePath) {
        const links = await this._loadFile(filePath);
        console.log('Number of items to download: ', links.length);

        for (let i = 0; i < links.length; i++) {
            console.log(`Downloading item ${i + 1} of ${links.length}`);
            const data = await exec(`/usr/bin/youtube-dl -x ${links[i]}`);
            this._convertToMp3(i, links.length, data.stdout.split('\n'));
        }
    }

    async _loadFile(filePath) {
        const data = await readFile(filePath, 'utf8');
        return data.split(',');
    }

    async _convertToMp3(pos, totalLinks, outputArray) {
        const fileName = this._getFileName(outputArray);

        if (fileName) {
            let noExt = fileName.split('.');
            noExt.pop();
            noExt = noExt.join('.');

            console.log(`Converting to MP3: ${pos + 1} of ${totalLinks}`);
            await exec(`/usr/bin/ffmpeg -i "${fileName}" -b:a 192K -vn "${noExt}.mp3"`)
            await unlink(`${__dirname}/${fileName}`);
        }

    }

    _getFileName(outputArray) {
        try {
            let found = outputArray.find(out => out.indexOf('[ffmpeg] Destination:') !== -1);
            if (!found) {
                found = outputArray.find(out => out.indexOf('[download] Destination:') !== -1);
            }
            if (found) {
                return found.split(':')[1].trim();
            }
            return null;
        } catch (err) {
            console.error(`Error when trying to identify the fileName: `, err);
            return null;
        }
    }

}

const yt2mp3 = new YoutubeBulkToMP3();
yt2mp3.download('./music.csv');