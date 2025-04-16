const fs = require('fs');
const path = require('path');

async function buildPage() {
  let distPath = path.join(__dirname, 'project-dist');
  let templatePath = path.join(__dirname, 'template.html');
  let currentAssets = path.join(__dirname, 'assets');
  let newAssets = path.join(__dirname, 'project-dist', 'assets');
  let currentPath = path.join(__dirname, 'styles');
  let writePath = fs.createWriteStream(path.join(distPath, 'style.css'));

  fs.mkdir(distPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

  let strTemplate = await fs.promises.readFile(templatePath, 'utf-8');

  let arrayComponents = [...strTemplate.matchAll(/{{\s*(\w+)\s*}}/g)];
  for (let [value, name] of arrayComponents) {
    let newText = await showResult(name);
    strTemplate = strTemplate.replace(value, newText);
  }

  await fs.promises.writeFile(
    path.join(__dirname, 'project-dist', 'index.html'),
    strTemplate,
    'utf-8',
  );

  run(currentAssets, newAssets);
  mergeStyle(currentPath, writePath);
}

async function showResult(str) {
  let componentsPath = path.join(__dirname, 'components', `${str}.html`);
  let readCurrentFile = await fs.promises.readFile(componentsPath, 'utf-8');
  return readCurrentFile;
}

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

async function mergeStyle(currentPath, writePath) {
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

buildPage();
