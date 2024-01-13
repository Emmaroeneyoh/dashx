const { adminModel } = require("../core/db/admin");
const { adminroleModel } = require("../core/db/role");
const { create_admin_token } = require("../core/utils");


const adminLoginModel = async (data,res) => {
  try {
    const { userEmail, } = data
    const userDetails = await adminModel.findOne({ email: userEmail });
    const roles = userDetails.roles
    console.log('roles' , roles)
    const adminrole = await  adminroleModel.find({ _id: { $in: roles } })
     const token = create_admin_token(userDetails._id)
     const userData = {
         id: userDetails._id,
         name: userDetails.name,
         email: userDetails.email,
         token, roles
      }
   
     return userData
  } catch (error) {
      return error.message
  }
     
}
 
module.exports = {
 adminLoginModel
}