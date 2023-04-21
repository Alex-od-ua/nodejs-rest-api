const Jimp = require("jimp");
const path = require("path");

const imageCompression = async (req, _, next) => {
  const imagefilename = req.imagefilename;

  const imagePath = path.join(__dirname, "../", "temp", imagefilename);

  await Jimp.read(imagePath, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).write(imagePath);

    next();
  });
};

module.exports = imageCompression;
