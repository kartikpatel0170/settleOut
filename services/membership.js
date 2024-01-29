const Membership = require("../model/membership");
const service = require("../utils/dbService");
const logger = require("../config/logger");

class MembershipService {
  async createMembership(body, type) {
    try {
      const result = await Membership.create(body);
      return result;
    } catch (error) {
      logger.error("Error in createMembership", error);
      throw new Error("Failed to create membership.");
    }
  }

  async findAllMemberships(query, options) {
    try {
      const result = await service.getAllDocuments(Membership, query, options);
      return result;
    } catch (error) {
      logger.error("Error in findAllMemberships", error);
      throw new Error("Failed to fetch memberships.");
    }
  }
}

module.exports = new MembershipService();
