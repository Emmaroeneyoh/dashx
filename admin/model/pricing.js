const { pricingModel } = require("../core/db/pricing");



const adminsetpricingModel = async (data, res) => {
    try {
      const {
        price_per_km , bike , car , van , truck , comision
       
      } = data;
      const form = await new pricingModel ({
        price_per_km , bike , car , van , truck , systemid : 'dashx' , comision
      });
     
        const userDetails = await form.save()
    
  
      return userDetails;
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
};


const adminupdatepriceModel = async (data, res) => {
    try {
      const { price_per_km , bike , car , van , comision ,  truck} = data;
  
      const form = await pricingModel.findOneAndUpdate({systemid : 'dashx'}, {
        $set: {
            price_per_km , bike , car , van , truck , comision
        },
      });
  
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
};
  
module.exports = {
    adminupdatepriceModel  ,  adminsetpricingModel
}