const Membership = require("../model/membership");
const service = require("../utils/dbService");

// Define an abstract class for memberships
class Memberships {
  constructor({ price, services, featured, name }) {
    if (this.constructor === Memberships) {
      throw new TypeError(
        'Abstract class "Membership" cannot be instantiated directly'
      );
    }
    this.price = price;
    this.services = services;
    this.featured = featured;
    this.name = name;
  }
}

// Define concrete subclasses for basic, advance, and premium memberships
class BasicMembership extends Memberships {
  constructor(options) {
    super({
      ...options,
      price: 99,
      services: [
        "Airport Pick Up",
        "Student ID",
        "Bus ID",
        "Campus Tour",
        "Sim Card/Mobile",
      ],
      name: "Basic",
    });
  }
}

class AdvanceMembership extends Memberships {
  constructor(options) {
    super({
      ...options,
      price: 149,
      services: [
        "Airport Pick Up",
        "Student ID",
        "Bus ID",
        "Campus Tour",
        "Sim Card/Mobile",
        "Health Card",
        "SIN number",
        "Banking",
        "Housing",
      ],
      featured: true,
      name: "Advance",
    });
  }
}

class PremiumMembership extends Memberships {
  constructor(options) {
    super({
      ...options,
      price: 199,
      services: [
        "Airport Pick Up",
        "Student ID",
        "Bus ID",
        "Campus Tour",
        "Sim Card/Mobile",
        "Health Card",
        "SIN number",
        "Banking",
        "Housing",
        "City Tour",
        "Alumini Mentorship",
        "Winter Shopping",
        "Job Aplication",
      ],
      featured: true,
      name: "Premium",
    });
  }
}

// Define a Membership Factory that creates instances of the concrete subclasses
class MembershipFactory {
  static createMembership(type, options) {
    switch (type) {
      case "basic":
        return new BasicMembership(options);
      case "advance":
        return new AdvanceMembership(options);
      case "premium":
        return new PremiumMembership(options);
      default:
        throw new Error(`Unknown membership type: ${type}`);
    }
  }
}

module.exports = MembershipFactory;
