const axios = require('axios');
const fs = require('fs');
const { print } = require('./util')
async function downloadimage(imageUrl, outputPath) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    fs.writeFileSync(outputPath, Buffer.from(response.data, 'binary'));

    print('Image downloaded successfully');
  } catch (error) {
    print('Error downloading image:', error);
  }
}

module.exports = {downloadimage};