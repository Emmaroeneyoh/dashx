const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { userModel } = require("../../user/core/db/user");



const adminretrievesingleuserModel = async (data,res) => {
    try {
      const { userid} = data
       const userDetails = await userModel.findById(userid);
     
     
       return userDetails
    } catch (error) {
        return error.message
    }
       
  }
const adminretrievesingledispatchModel = async (data,res) => {
    try {
      const { dispatchid} = data
       const userDetails = await dispatchModel.findById(dispatchid);
     
     
       return userDetails
    } catch (error) {
        return error.message
    }
       
  }
   
module.exports = {
    adminretrievesingleuserModel , adminretrievesingledispatchModel
  }