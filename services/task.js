const Membership = require("../model/membership");
const Task = require("../model/task");
const _ = require("lodash");
const service = require("../utils/dbService");
const logger = require("../config/logger");

class TaskService {
  async createTask(membershipId, agentId, userId) {
    try {
      const membershipData = await service.getSingleDocumentById(
        Membership,
        membershipId
      );
      const serviceData = _.map(membershipData.services, (doc) => ({
        name: doc,
      }));
      const data = {
        services: serviceData,
        membershipId,
        agentId,
        userId,
      };
      const result = await service.createDocument(Task, data);
      return result;
    } catch (error) {
      logger.error("Error in createTask", error);
      throw new Error("Failed to create task.");
    }
  }

  async findAllTasks(query, options) {
    try {
      const result = await service.getAllDocuments(Task, query, options);
      return result;
    } catch (error) {
      logger.error("Error in findAllTasks", error);
      throw new Error("Failed to fetch tasks.");
    }
  }

  async updateCheckBox(name, taskId) {
    try {
      const result = await Task.findOneAndUpdate(
        { _id: taskId, "services.name": name },
        {
          $set: {
            "services.$.status": "Completed",
            "services.$.completedAt": new Date(),
            status: "In-progress",
          },
        },
        { new: true }
      );
      return result;
    } catch (error) {
      logger.error("Error in updateCheckBox", error);
      throw new Error("Failed to update checkbox.");
    }
  }

  async updateTask(body, taskId) {
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
      throw new Error("Failed to update task.");
    }
  }
}

module.exports = new TaskService();
