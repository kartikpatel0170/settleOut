const User = require("../model/user");
const service = require("../utils/dbService");
const { MESSAGE } = require(`../config/message`);
const logger = require("../config/logger");

class UserService {
  async changePassword(user, currentPassword, newPassword) {
    try {
      const isPasswordMatched = await user.isPasswordMatch(currentPassword);
      if (isPasswordMatched) {
        await service.findOneAndUpdateDocument(User, { _id: user._id }, { password: newPassword });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.error("Error in changePassword", { userId: user._id, error });
      throw new Error(MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  async updateProfile(userId, body) {
    try {
      let userData = await service.findOneAndUpdateDocument(User, { _id: userId }, body, { new: true });

      if (body.bio) {
        await createMessage(userData.phone.phone, "We have received your request to upgrade your account. Thank you");
      }

      return userData.toJSON();
    } catch (error) {
      logger.error("Error in updateProfile", { userId, error });
      throw new Error(MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(query, options) {
    try {
      let result = await service.getAllDocuments(User, query, options);
      return result;
    } catch (error) {
      logger.error("Error in findAll", { error });
      throw new Error(MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = new UserService();
