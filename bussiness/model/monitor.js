const { dispatchModel } = require("../../dispatch/core/db/dispatch");


const bussinessUpdateprofileModel = async (data, res) => {
    try {
      const {   phone, name, fleetid, vehicle_type} = data;
  
      const form = await dispatchModel.findByIdAndUpdate(fleetid, {
        $set: {
          vehicle: {
            vehicle_type
          }, phone, name
        },
      });
  
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
};
const bussinesssuspendfleetModel = async (data, res) => {
    try {
      const {   phone, name, fleetid, vehicle_type} = data;
  
      const form = await dispatchModel.findByIdAndUpdate(fleetid, {
        $set: {
          vehicle: {
            vehicle_type
          }, phone, name
        },
      });
  
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
};
  
module.exports = {
    bussinessUpdateprofileModel 
}