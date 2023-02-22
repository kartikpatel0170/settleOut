const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

let Singleton = {
  async createInstance() {
    let instance = await require("stripe")(STRIPE_SECRET_KEY);
    return instance;
  },
};

module.exports = {
  async getStripeObject() {
    try {
      let stripe = await Singleton.createInstance();
      return stripe;
    } catch (e) {
      throw new Error(e);
    }
  },
  async getToken(cardDetails) {
    let instance = await require("stripe")(STRIPE_SECRET_KEY);
    return await instance.tokens.create(
      {
        card: {
          number: cardDetails.number,
          exp_month: cardDetails.exp_month,
          exp_year: cardDetails.exp_year,
          cvc: cardDetails.cvc,
       
        },
      }
    );
  },
};

