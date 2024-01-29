const authService = require("../services/auth");
const validation = require("../utils/validateRequest");
const authSchemaKey = require("../utils/validation/authValidation");
const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
const logger = require("../config/logger");

module.exports = {
  async login(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.login
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { email, password } = req.body;
      const result = await authService.loginUser(email, password, req);

      if (result) {
        return util.loginSuccess(result, res);
      } else {
        return util.loginFailed(MESSAGE.INCORRECT_PASSWORD, res);
      }
    } catch (error) {
      logger.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },

  async register(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.register
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const result = await authService.registration(req.body);
      res.message = MESSAGE.USER_REGISTERED.message;
      return util.successResponse(result, res);
    } catch (error) {
      logger.error("Error - register", error);
      return util.failureResponse(error, res);
    }
  },

  async resetPassword(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.resetPassword
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { email } = req.body;
      await authService.resetPassword(email);
      res.message = MESSAGE.RESET_PASSWORD.message;
      return util.resetPassword(res);
    } catch (error) {
      logger.error("Error - resetPassword", error);
      return util.failureResponse(error, res);
    }
  },

  async verifyResetPassword(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.resetVerifyPassword
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { email, OTP } = req.body;
      const result = await authService.verifyResetPassword(email, OTP);

      if (result) {
        return util.successResponse(result, res);
      } else {
        res.message = MESSAGE.INCORRECT_OTP.message;
        return util.failureResponse({}, res);
      }
    } catch (error) {
      logger.error("Error - verifyResetPassword", error);
      return util.failureResponse(error, res);
    }
  },

  async verifyOTPAndPassword(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.verifyOTPAndPassword
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { email, OTP, password } = req.body;
      const result = await authService.verifyOTPAndPassword(
        email,
        OTP,
        password
      );

      if (result) {
        res.message = MESSAGE.RESET_PASSWORD_SUCCESS.message;
        return util.successResponse(result, res);
      } else {
        res.message = MESSAGE.INCORRECT_OTP.message;
        return util.failureResponse({}, res);
      }
    } catch (error) {
      logger.error("Error - verifyOTPAndPassword", error);
      return util.failureResponse(error, res);
    }
  },

  async verifyEmail(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.verifyEmail
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { email, OTP } = req.body;
      const result = await authService.verifyEmail(email, OTP);

      if (result) {
        res.message = MESSAGE.OTP_VERIFIED_SUCCESS.message;
        return util.successResponse(result, res);
      } else {
        res.message = MESSAGE.INCORRECT_OTP.message;
        return util.failureResponse({}, res);
      }
    } catch (error) {
      logger.error("Error - verifyEmail", error);
      return util.failureResponse(error, res);
    }
  },

  async verifyPhone(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.verifyPhone
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { email, OTP } = req.body;
      const result = await authService.verifyPhone(email, OTP);

      if (result) {
        res.message = MESSAGE.OTP_VERIFIED_SUCCESS.message;
        return util.successResponse(result, res);
      } else {
        res.message = MESSAGE.INCORRECT_OTP.message;
        return util.failureResponse({}, res);
      }
    } catch (error) {
      logger.error("Error - verifyPhone", error);
      return util.failureResponse(error, res);
    }
  },

  async sendEmailOtp(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.sendEmailOtp
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { email } = req.body;
      const result = await authService.sendEmailOtp(email);

      res.message = MESSAGE.OTP_SEND.message;
      return util.successResponse(result, res);
    } catch (error) {
      logger.error("Error - sendEmailOtp", error);
      return util.failureResponse(error, res);
    }
  },

  async sendPhoneOtp(req, res) {
    try {
      const isValid = validation.validateParamsWithJoi(
        req.body,
        authSchemaKey.sendPhoneOtp
      );
      if (isValid.error) {
        return util.inValidParam(isValid.details, res);
      }

      const { email } = req.body;
      const result = await authService.sendPhoneOtp(email);

      res.message = MESSAGE.OTP_SEND.message;
      return util.successResponse(result, res);
    } catch (error) {
      logger.error("Error - sendPhoneOtp", error);
      return util.failureResponse(error, res);
    }
  }
};
