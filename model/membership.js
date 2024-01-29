const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
const idValidator = require("mongoose-id-validator");
const logger = require("../config/logger");

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

const { Schema, model } = mongoose;

const membershipSchema = new Schema(
  {
    price: Number,
    services: [String],
    featured: {
      type: Boolean,
      default: false
    },
    name: String
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

membershipSchema.plugin(mongoosePaginate);
membershipSchema.plugin(idValidator);

const Membership = model("Membership", membershipSchema, "Membership");

logger.info("Membership model created and configured");

module.exports = Membership;
