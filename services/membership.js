  const Membership = require("../model/membership");
  const service = require("../utils/dbService");
  const MembershipFactory = require("./membershipFactory");
  const MembershipObserver = require("../observers/membershipObserver");

  module.exports = {
    create: async (body, type) => {
      try {
        const membership = MembershipFactory.createMembership(type, body);
        let result = await membership.save();
        membership.addObserver(_id);
        // notify observers about the new membership
        membership.notifyObservers(membership);
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    findAll:async(query,options)=>{
      try
      {
          let result=await service.getAllDocuments(Membership,query,options)
          return result;
      }
      catch(error)
      {
          console.error(error)
          throw error
      }
    },

    addObserver: async (membershipId, observerId) => {
      try {
        const membership = await Membership.findById(membershipId);
        if (!membership) {
          throw new Error("Membership not found");
        }
        membership.addObserver(observerId);
        await membership.save();
        return membership;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  
    removeObserver: async (membershipId, observerId) => {
      try {
        const membership = await Membership.findById(membershipId);
        if (!membership) {
          throw new Error("Membership not found");
        }
        membership.removeObserver(observerId);
        await membership.save();
        return membership;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
