const { adminroleModel } = require("../core/db/role");
const { handleError } = require("../core/utils");
const { admincreateroleModel, adminupdateroleModel } = require("../model/role");



const admincreateroleController = async (req, res, next) => {
    const { role } = req.body;
    try {
        const adminrole = role.toLowerCase();
        const admin = await adminroleModel.findOne({role : adminrole });
        
        if (admin) {
            return res.status(400).json({
                status_code: 400,
                status: false,
                message: "role already exist",
                error: "role already exist",
            });
        }
      const data = {
        adminrole
      };
  
      let trainee = await admincreateroleModel(data, res);
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "role added",
        // data: trainee,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
  };
const adminupdateroleController = async (req, res, next) => {
    const { role , roleid } = req.body;
    try {
        const adminrole = role.toLowerCase();
        
      const data = {
        adminrole ,  roleid
      };
  
      let trainee = await adminupdateroleModel(data, res);
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "role added",
        // data: trainee,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
const adminretrieveroleController = async (req, res, next) => {
    const { roleid } = req.body;
    try {
      let trainee = await adminroleModel.find();
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "role added",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
  
module.exports = {
    adminupdateroleController , admincreateroleController  , adminretrieveroleController
}