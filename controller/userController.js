const userService = require("../services/user");
const validation = require("../utils/validateRequest");
const userSchemaKey = require("../utils/validation/userValidation");
const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
module.exports = {
  getProfile: async (req, res) => {
    try {
      return util.successResponse(req.user, res);
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },

  changePassword: async (req, res) => {
    try {
      let isValid = validation.validateParamsWithJoi(
        req.body,
        userSchemaKey.changePassword
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }
      let { currentPassword, newPassword } = req.body;

      let result = await userService.changePassword(
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
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },

  updateProfile: async (req, res) => {
    try {
      // let isValid = validation.validateParamsWithJoi(
      //   req.body,
      //   userSchemaKey.schemaKeys
      // );
      // if (isValid.error) {
      //   return util.inValidParam(isValid.details, res);
      // }
      let { userId, ...body } = req.body;
      let result = await userService.updateProfile(userId, body);
      return util.successResponse(result, res);
    } catch (error) {
      console.error("Error - login", error);
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
      let result = await userService.findAll(query, options);
      if (result) {
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(MESSAGE.BAD_REQUEST, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
};
