const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");
const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "data",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator"
};
mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels
};
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    services: [
      {
        name: {
          type: String
        },
        status: {
          type: String
        },
        completedAt: {
          type: Date
        }
      }
    ],
    status: {
      type: String,
      default: "Ordered"
    },
    membershipId: {
      type: Schema.Types.ObjectId,
      ref: "Membership"
    },
    comment: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const user = mongoose.model("Task", schema, "Task");
module.exports = user;
