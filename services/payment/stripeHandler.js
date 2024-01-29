const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

class StripeHandler {
  constructor() {
    this.instance = null;
  }

  async createInstance() {
    if (!this.instance) {
      this.instance = await require("stripe")(STRIPE_SECRET_KEY);
    }
    return this.instance;
  }

  async getStripeObject() {
    try {
      const stripe = await this.createInstance();
      return stripe;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getToken(cardDetails) {
    try {
      const instance = await this.createInstance();
      return await instance.tokens.create({
        card: {
          number: cardDetails.number,
          exp_month: cardDetails.exp_month,
          exp_year: cardDetails.exp_year,
          cvc: cardDetails.cvc,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new StripeHandler();
