const sgMail = require("@sendgrid/mail");
const logger = require("./logger");

sgMail.setApiKey(process.env.SENDGRID_API);

const createEmail = async (to, text, subject) => {
  try {
    const msg = {
      to: to,
      from: "settleout@mailinator.com",
      subject: subject,
      text: text,
      html: "<strong>Welcome to SettleOut</strong>"
    };

    await sgMail.send(msg);
    logger.info("Email sent");
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
  }
};

module.exports = {
  createEmail
};
