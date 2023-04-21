const Jimp = require("jimp");
const path = require("path");

const imageCompression = async (req, _, next) => {
  const filename = req.filename;
  console.log(filename);

  const imagePath = path.join(__dirname, "../", "temp", filename);

  await Jimp.read(imagePath, (err, image) => {
    if (err) throw err;
    image
      .resize(250, 250)

      .write(imagePath);
    next();
  });
};

module.exports = imageCompression;
