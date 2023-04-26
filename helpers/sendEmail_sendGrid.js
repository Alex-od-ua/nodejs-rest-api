const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "", // кому
//   from: EMAIL_FROM, // от кого
//   subject: "Test email", // тема письма
//   html: `<p>Test email</p>`,
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

const sendEmailSendGrid = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmailSendGrid;
