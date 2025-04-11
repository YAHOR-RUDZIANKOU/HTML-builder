const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

let currentPath = path.join(__dirname, 'source.txt');
const output = fs.createWriteStream(currentPath, { flags: 'a' });
stdout.write('Введите текст\n');
stdin.on('data', (data) => {
  const inputText = data.toString().trim();
  if (inputText === 'exit' || inputText === 'Exit') {
    process.stdout.write('До свидания!\n');
    process.exit();
  }
  output.write(data);

  stdout.write('Введите текст (введите "exit" для завершения)\n');
});

process.on('SIGINT', () => {
  process.stdout.write('До свидания! (Ctrl + C был нажат)\n');
  process.exit(); // Завершаем процесс
});
