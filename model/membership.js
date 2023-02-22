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
  meta: "paginator",
};
mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels,
};
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    price: {
      type: Number,
    },
    services: [
      {
        type: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    name:{
      type:String
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

const user = mongoose.model("Membership", schema, "Membership");
module.exports = user;
