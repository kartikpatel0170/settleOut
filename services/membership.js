  const Membership = require("../model/membership");
  const service = require("../utils/dbService");

  module.exports = {
    create: async (body, type) => {
      try {
        let result = await membership.save();
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
    }    
  };
