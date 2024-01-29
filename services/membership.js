const Membership = require("../model/membership");
const service = require("../utils/dbService");
const logger = require("../config/logger");

module.exports = {
  create: async (body, type) => {
    try {
      const result = await Membership.create(body);
      return result;
    } catch (error) {
      logger.error("Error in createMembership", error);
      throw error;
    }
  },

  findAll: async (query, options) => {
    try {
      const result = await service.getAllDocuments(Membership, query, options);
      return result;
    } catch (error) {
      logger.error("Error in findAllMemberships", error);
      throw error;
    }
  }
};
