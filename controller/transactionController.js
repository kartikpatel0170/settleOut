const transactionService = require("../services/transaction");
const util = require("../utils/messages");
const { MESSAGE } = require("../config/message");

module.exports = {
    create: async(req, res) => {
        try {
            let { userId, cardDetails, amount, membershipId, agentId } = req.body;
            let result = await transactionService.create(userId, cardDetails, amount, membershipId, agentId);

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