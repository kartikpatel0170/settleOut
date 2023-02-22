const Membership = require("../model/membership");
const service = require("../utils/dbService");

module.exports = {
  create: async (body) => {
    try {
      let result = await service.createDocument(Membership, body);
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
