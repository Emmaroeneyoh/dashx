const { pricingModel } = require("../core/db/pricing");
const { adminupdatepriceModel, adminsetpricingModel } = require("../model/pricing");



const adminsetpricingController = async (req, res, next) => {
    const {price_per_km , bike , car , van , big_truck , medium_truck , small_truck , comision} =
      req.body;
    
  
    try {
      const data = {
        price_per_km , bike , car , van , truck , comision
      };
  
      let trainee = await adminsetpricingModel(data, res);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      return handleError(error.message)(res);
    }
  };
const adminupdatepricingController = async (req, res, next) => {
    const {price_per_km , bike , car , van , big_truck , medium_truck , small_truck , comision} =
      req.body;
    
  
    try {
      const data = {
        price_per_km , bike , car , van , big_truck , medium_truck , small_truck , comision
      };
  
      let trainee = await adminupdatepriceModel(data, res);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      return handleError(error.message)(res);
    }
  };
const retrievepricingController = async (req, res, next) => {
  
    try {
      
      let trainee = await  pricingModel.find();
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      return handleError(error.message)(res);
    }
};
  

module.exports = {
    retrievepricingController ,  adminupdatepricingController , adminsetpricingController
}