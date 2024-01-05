const { bussinessUpdateprofileModel } = require("../model/monitor");



const bussinessupdatdispatchController = async (req, res, next) => {
    const {  phone, name, fleetid, vehicle_type } = req.body;
    try {
     
      const data = {
        phone, name, fleetid, vehicle_type
      };
      let trainee = await bussinessUpdateprofileModel(data, res);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "user successfully retrieved",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
  
module.exports = {
    bussinessupdatdispatchController
}