const membershipService = require("../services/membership");
const util = require("../utils/messages");
const { MESSAGE } = require("../config/message");
const Membership = require("../model/membership");

module.exports = {
  create: async (req, res) => {
    try {
      let result = await membershipService.create(req.body);
      
      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      console.error("Error - create-membership", error);
      return util.failureResponse(error, res);
    }
  },
  findAll: async (req, res) => {
    try {
      let { query, options } = req.body;
      if (!query) {
        query = {};
      }
      if (!options) {
        options = {};
      }
      let result = await membershipService.findAll(query, options);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      console.error("Error - membership", error);
      return util.failureResponse(error, res);
    }
  },
};
