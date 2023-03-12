const User = require("../model/user");
const service = require("../utils/dbService");

module.exports = {
  addfeedback: async (agentId, userId, feedback, rating) => {
    try {
      let result = await User.findOneAndUpdate({_id: agentId}, {$push:{feedback:{userId: userId, feedback: feedback, date: new Date()}}, $set:{ratings: rating}}, {new: true} );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  findAll: async (userId) => {
    try {
      const user = await service.getSingleDocumentById(User, userId); 
      if (!user) {
        return "There is no data";
      } 
      return user.feedback;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};