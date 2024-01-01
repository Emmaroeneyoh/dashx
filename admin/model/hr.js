const { adminModel } = require("../core/db/admin");

const admincreateadminModel = async (data, res) => {
    try {
      const {
        name, adminEmail, Harshpassword, phone, roles
       
      } = data;
      const form = await new adminModel ({
          email:adminEmail,roles,
         password : Harshpassword,
          phone, name
      });
     
        const userDetails = await form.save()
      return 'please check email for code';
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
};
  
const adminaddroleModel = async (data, res) => {
    try {
      const {subadminid , role } = data;
      const form = await adminModel.findByIdAndUpdate(subadminid, {
        $push: {
          roles: { role },
        },
      });
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
  };
  const adminremoveroleModel = async (data, res) => {
    try {
      const { subadminid , role } = data;
      const form = await adminModel.findByIdAndUpdate(subadminid, {
        $pull: {
          roles: { role },
        },
      });
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
  };
  

module.exports = {
    admincreateadminModel , adminremoveroleModel  , adminaddroleModel 
  }