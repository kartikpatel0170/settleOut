const User = require("../model/user");

module.exports = {
  addfeedback: async (agentId, userId, feedback, rating) => {
    try {
      let result = await User.findOneAndUpdate({_id: agentId}, {$push:{feedback:{userId: userId, feedback: feedback, date: new Date()}}, $set:{ratings: rating}}, {new: true} );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};