const accountSid = process.env.TWILIO_ACC_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_ACC_TOKEN; // Your Auth Token from www.twilio.com/console

const client = require("twilio")(accountSid, authToken);
const logger = require("./logger");

const createMessage = async (to, body) => {
  try {
    client.messages
      .create({
        body: body,
        to: "+1" + to, // Text this number
        from: "+16479311399" // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

    logger.info(`Twilio message sent: ${message.sid}`);
  } catch (error) {
    logger.error(`Error sending Twilio message: ${error.message}`);
  }
};

module.exports = {
  createMessage
};
