const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");

const MembershipObserver = require("../observers/membershipObserver")

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
    observer: { type: [mongoose.Schema.Types.ObjectId], default: [] }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);


// method to add observers
schema.methods.addObserver = function(observerId) {
  this.observer.push(observerId);
};

schema.methods.removeObserver = function(observerId) {
  this.observer.pull(observerId);
};

// method to notify all observers
schema.methods.notifyObservers = function (updatedMembership) {
  const observers = this.observer;
  observers.forEach(observerId => {
    const observer = new MembershipObserver(); // create a new observer object
    observer.notify(updatedMembership, observerId);
  });
};

// middleware to trigger the notifyObservers method on update
schema.post('findOneAndUpdate', function (doc) {
  this.notifyObservers(doc);
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const Membership = mongoose.model('Membership', schema, 'Membership');

module.exports = Membership;