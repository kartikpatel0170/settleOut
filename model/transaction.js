const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");
const bcrypt = require("bcrypt");
const { MASTER } = require("../config/authConstant");

const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "data",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};
mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels,
};
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    membershipId: {
      type: Schema.Types.ObjectId,
      ref: "Membership",
    },
    status: {
      type: String,
    },
    statusHistory: [
      {
        status: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
    price: {
      type: Number,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const user = mongoose.model("Transaction", schema, "Transaction");
module.exports = user;
