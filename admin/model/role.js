const { adminroleModel } = require("../core/db/role");


const admincreateroleModel = async (data, res) => {
    try {
      const {
        adminrole
       
      } = data;
      const form = await new adminroleModel ({
          role: adminrole
      });
     
        const userDetails = await form.save()
    
  
      return userDetails;
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
};
  

const adminupdateroleModel = async (data, res) => {
    try {
      const { roleid , adminrole} = data;
  
      const form = await adminroleModel.findByIdAndUpdate(roleid, {
        $set: {
         role : adminrole
        },
      });
  
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
  };
module.exports = {
    admincreateroleModel , adminupdateroleModel
}
  