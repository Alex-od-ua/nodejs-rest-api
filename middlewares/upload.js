const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp"); // путь к папке temp

const multerConfig = multer.diskStorage({
  // настройка  multer, что делать с файлами, куда их девать
  destination: tempDir, // путь к папке где будем временно хранить файлы
  filename: (req, file, cb) => {
    // сохраняем файл под другим именем или таким же
    // req - весь запрос который пришел, file информация про файл, cd аналог next()

    // const date = new Date()
    // const time = date.getTime()
    // const filiname = `${time}_${file.originalname}`
    // cb(null, filename) // имя с датой

    cb(null, file.originalname); // вторым арнументом узывается новое имя и расширение + можно добавить дату, file.originalname не переименовывать
  },
}); // дальше создаем мидлвар который фыйл сохранит в папке а текстовые поля запишет в req.body

const upload = multer({
  // создаем мидлвар с настройками multerConfig
  storage: multerConfig,
  // fileFilter: (req, file, cb) => {} - фильтр типов файлов которые получаем
});

module.exports = upload;
