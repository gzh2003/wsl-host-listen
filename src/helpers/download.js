import { createWriteStream, unlink } from 'fs';
import { finished } from 'stream';
import axios from 'axios';

export default async function downloadRelease(releaseUrl, filePath) {
  try {
    const response = await axios({
      url: releaseUrl,
      method: 'GET',
      responseType: 'stream',
      validateStatus: (status) => status >= 200 && status < 300,
      maxRedirects: 5,
    });

    const fileStream = createWriteStream(filePath);
    response.data.pipe(fileStream);

    await new Promise((resolve, reject) => {
      finished(fileStream, (err) => {
        if (err) {
          unlink(filePath, () => {});
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    unlink(filePath, () => {});
    throw error;
  }
}
