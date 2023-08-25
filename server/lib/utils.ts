var fs = require('fs');

// Generates files with random numbers
// Parameters:
//   fileCount: number of files to generate
//   numberCount: number of random numbers to generate in each file
// Output: list of file names generated
export function generateFiles(fileCount: number, numberCount: number): string[] {
  console.log('GenerateFiles');
  console.log('fileCount: ' + fileCount);
  console.log('numberCount: ' + numberCount);
  const filenames: string[] = [];
  for (let i = 0; i < fileCount; i++) {
    let fileName = 'data/data' + i + '.csv';
    let fileStream = fs.createWriteStream(fileName);
    for (let j = 0; j < numberCount; j++) {
      fileStream.write(Math.floor(Math.random() * (j + 1)) + '\n');
    }
    fileStream.end();
  }
  return filenames;
}