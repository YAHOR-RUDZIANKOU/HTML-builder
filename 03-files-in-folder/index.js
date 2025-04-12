const fs = require('fs');
const path = require('path');

let currentPath = path.join(__dirname, 'secret-folder');

fs.readdir(currentPath, { withFileTypes: true }, (err, entries) => {
  if (err) {
    return console.error('Ошибка:', err.message);
  }

  //   console.log(entries);
  entries.forEach((entry) => {
    if (entry.isFile()) {
      const fullPath = path.join(currentPath, entry.name);
      let nameFile = path.parse(entry.name).name;
      let exten = path.extname(entry.name).slice(1);
      fs.stat(fullPath, (err, stats) => {
        if (err) return console.error(err);
        let fileSize = stats.size;
        console.log(`${nameFile}-${exten}-${fileSize}`);
      });
    }
  });
});

// const fs = require('fs');
// const path = require('path');

// async function getFileInfo() {
//   const currentPath = path.join(__dirname, 'secret-folder');

//   try {
//     const entries = await fs.promises.readdir(currentPath, { withFileTypes: true });

//     for (const entry of entries) {
//       if (entry.isFile()) {
//         const fullPath = path.join(currentPath, entry.name);
//         const nameFile = path.parse(entry.name).name;
//         const exten = path.extname(entry.name).slice(1);

//         const stats = await fs.promises.stat(fullPath);  // ожидаем результат асинхронно
//         const fileSize = stats.size;

//         console.log(`${nameFile}-${exten}-${fileSize}`);
//       }
//     }
//   } catch (err) {
//     console.error('Ошибка:', err.message);
//   }
// }

// getFileInfo();
