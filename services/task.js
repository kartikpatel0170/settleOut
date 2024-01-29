const Membership = require("../model/membership");
const Task = require("../model/task");
const _ = require("lodash");
const service = require("../utils/dbService");
const logger = require("../config/logger");

module.exports = {
  create: async (membershipId, agentId, userId) => {
    try {
      const membershipData = await service.getSingleDocumentById(
        Membership,
        membershipId
      );
      const serviceData = _.map(membershipData.services, (doc) => ({
        name: doc
      }));
      const data = {
        services: serviceData,
        membershipId,
        agentId,
        userId
      };
      const result = await service.createDocument(Task, data);
      return result;
    } catch (error) {
      logger.error("Error in createTask", error);
      throw error;
    }
  },

  findAll: async (query, options) => {
    try {
      const result = await service.getAllDocuments(Task, query, options);
      return result;
    } catch (error) {
      logger.error("Error in findAllTasks", error);
      throw error;
    }
  },
  updateCheckBox: async (name, taskId) => {
    try {
      const result = await Task.findOneAndUpdate(
        { _id: taskId, "services.name": name },
        {
          $set: {
            "services.$.status": "Completed",
            "services.$.completedAt": new Date(),
            status: "In-progress"
          }
        },
        { new: true }
      );
      return result;
    } catch (error) {
      logger.error("Error in updateCheckBox", error);
      throw error;
    }
  },
  update: async (body, taskId) => {
    try {
      const result = await service.findOneAndUpdateDocument(
        Task,
        { _id: taskId },
        body,
        { new: true }
      );
      return result;
    } catch (error) {
      logger.error("Error in updateTask", error);
      throw error;
    }
  }
};
