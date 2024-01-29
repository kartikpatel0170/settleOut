const userService = require("../services/user");
const validation = require("../utils/validateRequest");
const userSchemaKey = require("../utils/validation/userValidation");
const util = require("../utils/messages");
const logger = require("../config/logger");
const { MESSAGE } = require("../config/message");

module.exports = {
  async getProfile(req, res) {
    try {
      return util.successResponse(req.user, res);
    } catch (error) {
      logger.error("Error - getProfile", error);
      return util.failureResponse(error, res);
    }
  },

  async changePassword(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        userSchemaKey.changePassword
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { currentPassword, newPassword } = req.body;
      const result = await userService.changePassword(
        req.user,
        currentPassword,
        newPassword
      );

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.loginFailed(MESSAGE.INCORRECT_PASSWORD, res);
      }
    } catch (error) {
      logger.error("Error - changePassword", error);
      return util.failureResponse(error, res);
    }
  },

  async updateProfile(req, res) {
    try {
      // Validate schema if needed
      // const isValid = validation.validateParamsWithJoi(
      //   req.body,
      //   userSchemaKey.schemaKeys
      // );
      // if (isValid.error) {
      //   return util.inValidParam(isValid.details, res);
      // }

      const { userId, ...body } = req.body;
      const result = await userService.updateProfile(userId, body);
      return util.successResponse(result, res);
    } catch (error) {
      logger.error("Error - updateProfile", error);
      return util.failureResponse(error, res);
    }
  },

  async findAll(req, res) {
    try {
      let { query, options } = req.body;
      if (!query) {
        query = {};
      }
      if (!options) {
        options = {};
      }

      const result = await userService.findAll(query, options);

      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      logger.error("Error - findAll", error);
      return util.failureResponse(error, res);
    }
  }
};
