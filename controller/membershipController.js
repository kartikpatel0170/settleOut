const membershipService = require("../services/membership");
const util = require("../utils/messages");
const logger = require("../config/logger");
const { MESSAGE } = require("../config/message");
const Membership = require("../model/membership");

module.exports = {
  async create(req, res) {
    try {
      const result = await membershipService.create(req.body);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - create-membership", error);
      return util.failureResponse(error, res);
    }
  },

  async findAll(req, res) {
    try {
      let { query, options } = req.body;
      query = query || {};
      options = options || {};

      const result = await membershipService.findAll(query, options);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - findAll membership", error);
      return util.failureResponse(error, res);
    }
  }
};
