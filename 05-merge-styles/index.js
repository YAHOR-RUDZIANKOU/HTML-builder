const fs = require('fs');
const path = require('path');
// const { stdin, stdout } = process;

let currentPath = path.join(__dirname, 'styles');
let newPath = path.join(__dirname, 'project-dist');
let writePath = fs.createWriteStream(path.join(newPath, 'bundle.css'));

async function mergeStyle() {
  fs.readdir(currentPath, { withFileTypes: true }, (err, entries) => {
    if (err) {
      return console.error('Ошибка:', err.message);
    }
    let processedCount = 0;
    const cssFiles = entries.filter(
      (entry) => entry.isFile() && path.extname(entry.name) === '.css',
    );
    for (const entry of cssFiles) {
      let stream = fs.createReadStream(path.join(currentPath, entry.name));

      stream.pipe(writePath, { end: false });

      stream.on('end', () => {
        processedCount++;
        if (processedCount === cssFiles.length) {
          writePath.end();
        }
      });
    }
  });
}

mergeStyle();
