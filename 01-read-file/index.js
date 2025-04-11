const fs = require('fs');
const path = require('path');

let currentPath = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(currentPath, 'utf8');

stream.on('data', (chunk) => {
  process.stdout.write(chunk);
});
