const User = require("../model/user");
const service = require("../utils/dbService");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { JWT, MASTER } = require("../config/authConstant");
const { MESSAGE } = require(`../config/message`);
const {createMessage}=require("../config/sms")
module.exports = {
  changePassword: async (user, currentPassword, newPassword) => {
    try {
      const isPasswordMatched = await user.isPasswordMatch(currentPassword);
      if (isPasswordMatched) {
        await service.findOneAndUpdateDocument(
          User,
          { _id: user._id },
          { password: newPassword }
        );
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateProfile: async (userId, body) => {
    try {
      let userData = await service.findOneAndUpdateDocument(
        User,
        { _id: userId },
        body,
        { new: true }
      );
      if(body.bio )
      {
        await createMessage(userData.phone.phone,"We have received your request to upgrade your account. Thank you")
      }
      return userData.toJSON();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  findAll: async (query, options) => {
    try {
      let result = await service.getAllDocuments(User, query, options);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
