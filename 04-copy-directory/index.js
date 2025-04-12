const path = require('path');
const fs = require('fs');

let currentPath = path.join(__dirname, 'files');
let newFilePath = path.join(__dirname, 'newFiles');

fs.promises.mkdir(newFilePath, { recursive: true });
// console.log(currentPath);

async function run(parPathOne, parPathTwo) {
  const files = await fs.promises.readdir(parPathOne, { withFileTypes: true });
  //   console.log(files);
  for (const value of files) {
    let firstPath = path.join(parPathOne, value.name);
    let secondFile = path.join(parPathTwo, value.name);

    if (value.isFile()) {
      await fs.promises.copyFile(firstPath, secondFile);
    } else if (value.isDirectory()) {
      await fs.promises.mkdir(secondFile, { recursive: true });
      await run(firstPath, secondFile);
    }
  }
}
run(currentPath, newFilePath);
