var fs = require('fs');

export function GenerateFiles(fileCount: number, numberCount: number) {
  console.log('GenerateFiles');
  console.log('fileCount: ' + fileCount);
  console.log('numberCount: ' + numberCount);
  for (let i = 0; i < fileCount; i++) {
    let fileName = 'data/data' + i + '.csv';
    let fileStream = fs.createWriteStream(fileName);
    for (let j = 0; j < numberCount; j++) {
      fileStream.write(Math.floor(Math.random() * (j + 1)) + '\n');
    }
    fileStream.end();
  }
}