const { userorderModel } = require("../core/db/order");
const { userModel } = require("../core/db/user");




const usercreateorderModel = async (data, res) => {
    try {
      const {
        vehicle_type,
        sendername,
        productname,
        senderphone,
        senderaddress,
        sendercity,
        senderlandmark,
        receivername,
        receiverphone,
        receiveraddress,
        receivercity,
        receiverlandmark, delivery_fee , userid , total_fee
       
      } = data;
      const form = await new userorderModel ({
        vehicle_type,
        sendername,
        productname,
        senderphone,
        senderaddress,
        sendercity,
        senderlandmark,
        receivername,
        receiverphone,
        receiveraddress,
        receivercity,
        receiverlandmark, delivery_fee , userid , total_fee
      });
      const userDetails = await form.save()
      return userDetails;
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
};
  

const userretrievesingleorderModel = async (data, res) => {
    try {
      const { orderid } = data;
        const profile = await userorderModel.findById(orderid)
        // const review = await productreviewModel.find({productid})
        //  const data = { product , review}
      return profile;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
module.exports = {
    usercreateorderModel , userretrievesingleorderModel
}