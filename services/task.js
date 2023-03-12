const Membership = require("../model/membership");
const Task = require("../model/task");
const _ = require("lodash");
const service = require("../utils/dbService");

module.exports = {
    create: async(membershipId, agentId, userId) => {
        try {
            let membershipData = await service.getSingleDocumentById(
                Membership,
                membershipId
            );
            let serviceData = _.map(membershipData.services, (doc) => {
                return { name: doc };
            });

            let data = {
                services: serviceData,
                membershipId: membershipId,
                agentId: agentId,
                userId: userId,
            };
            let result = await service.createDocument(Task, data);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    findAll: async(query, options) => {
        try {
            let result = await service.getAllDocuments(Task, query, options);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateCheckBox: async(name, taskId) => {
        try {

            let result = await Task.findOneAndUpdate({ _id: taskId, "services.name": name }, {
                $set: {
                    "services.$.status": "Completed",
                    "services.$.completedAt": new Date(),
                    status: "In-progress"
                },
            }, {
                new: true
            });
            return result
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    update: async(body, taskId) => {
        try {
            let result = await service.findOneAndUpdateDocument(Task, { _id: taskId }, body, { new: true })
            return result
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};