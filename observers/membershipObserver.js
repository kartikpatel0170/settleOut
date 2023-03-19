const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class MembershipObserver {
  async notifyObservers(updatedMembership, observerId) {
    const user = await User.findById(observerId); // Assume User model exists and has findById method
    if (!user) {
      console.log(`User with id ${observerId} not found`);
      return;
    }

    const message = {
      to: user.email,
      from: 'settleout@mailinator.com',
      subject: 'Membership Added',
      text: `Your selected membership has been added as ${updatedMembership.type}. Hope you will enjoy our service. Happy Journey!!`,
    };

    try {
      await sgMail.send(message);
      console.log(`Email sent to ${user.email}`);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MembershipObserver;
