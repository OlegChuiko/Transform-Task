const fs = require('fs');
const { Transform } = require('stream');

//Файли
const filePath = 'text.txt';

const outputFilePath = 'ChangedTextFile.txt';

// Створення трансформаційного потоку
const capitalizeStream = new Transform({
  transform(chunk, encoding, callback) {
    const capitalizedChunk = chunk.toString().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
    callback(null, capitalizedChunk);
  }
});

// Створення потоку читання та потоку запису
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
const writeStream = fs.createWriteStream(outputFilePath, { encoding: 'utf-8' });

// Підключення потоків між собою
readStream.pipe(capitalizeStream).pipe(writeStream);
