const nodemailer = require("nodemailer");
require("dotenv").config(); // for env file

const { EMAIL_FROM, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465 с шифровнием, 2525 без шифрования
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig); // обьект который отправляет почту

// const data = {
//   to: "wasiy78240@saeoil.com",
//   subject: "Test email",
//   html: `<p>Test email</p>`,
// };

const sendEmailMeta = async (data) => {
  const email = { ...data, from: "ais_alex@meta.ua" };
  await transport.sendMail(email);
  return true;
};
module.exports = sendEmailMeta;

// создаем письмо
// const email = {
//   to: "wasiy78240@saeoil.com", // кому отпр
//   from: "ais_alex@meta.ua", // от кого
//   subject: "Test email",
//   html: `<p>Test email</p>`,
// };

// // отправляем письмо (возвращает промис)
// transport
//   .sendMail(email)
//   .then(() => {
//     console.log("Email send success");
//   })
//   .catch((error) => console.log(error.message));
