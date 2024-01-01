const { adminModel } = require("../core/db/admin");
const { create_admin_token } = require("../core/utils");


const adminLoginModel = async (data,res) => {
  try {
    const { userEmail, } = data
     const userDetails = await adminModel.findOne({ email:userEmail});
     const token = create_admin_token(userDetails._id)
     const userData = {
         id: userDetails._id,
         name: userDetails.name,
         email: userDetails.email,
         token,
      }
   
     return userData
  } catch (error) {
      return error.message
  }
     
}
 
module.exports = {
 adminLoginModel
}