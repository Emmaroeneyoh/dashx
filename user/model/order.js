const { pricingModel } = require("../../admin/core/db/pricing");
const { ordercodemodel } = require("../../dispatch/core/db/order_code");
const { dispatchWalletModel } = require("../../dispatch/core/db/wallet");
const { userorderModel } = require("../core/db/order");
const { userModel } = require("../core/db/user");
const { userWalletModel } = require("../core/db/wallet");
const { generateordercode } = require("../core/utils");




const usercreateorderModel = async (data, res) => {
    try {
      const {
        vehicle_type,
        sendername,
        productname,
        senderphone,
        senderaddress,
      city,
        senderlandmark,
        receivername,
        receiverphone,
        receiveraddress,
        receivercity,
        receiverlandmark, userid , total_fee ,      senderlat,
        senderlong, 
        receiverlat,
        receiverlong, payment_method , trackingid
       
      } = data;
      //calculate commission and deloverfee
      const pricing = await pricingModel.findOne({ systemid: 'dashx' })
      const commision = pricing.comision
      const commission_fee = (commision / 100) * total_fee 
      const delivery_fee = total_fee - commission_fee
    
      //check if payment method is true , then order paid should be true 
      let order_paid 
      if (payment_method) {
        order_paid  = true
      } else {
        order_paid  = false
      }
      let trackid;
      if (trackingid == 0) {
        trackid = await generateordercode()
      }
      
      const form = await new userorderModel ({
        vehicle_type, payment_method , order_paid ,  commission_fee, trackingid:trackid ,
        sendername,
        productname,
        senderphone,
        senderaddress,
        sendercity : city,
        senderlandmark,
        receivername,
        receiverphone,
        receiveraddress,
        receivercity,
          receiverlandmark, delivery_fee, userid, total_fee,
          sendercordinate : {  senderlat,
            senderlong, } ,  receivercordinate: {    receiverlat,
                receiverlong, }
      });
        const userDetails = await form.save()
        
        // update wallet of user
        // find the wallet of the user
      if (payment_method) {
        await userWalletModel.findOneAndUpdate({userid}  ,
          { $inc: { balance: -total_fee } }
        );
      }
       
      return userDetails;
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
};
  

const userretrievesingleorderModel = async (data, res) => {
    try {
      const { orderid } = data;
        const order = await userorderModel.findById(orderid).populate('dispatchid')
        const ordercode = await ordercodemodel.findOne({ orderid }).select('order_code')
        // const review = await productreviewModel.find({productid})
        //  const data = { product , review}
        const datas = {order , ordercode}
      return datas;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};

const usercancelorderModel = async (data, res) => {
  try {
    const { orderid  , userid} = data;
    const order = await userorderModel.findById(orderid)
    const amount = order.total_fee
    const payment_method = order.payment_method
    const dispatchid = order.dispatchid
    const commission_fee = order.commission_fee
//update the order
    await userorderModel.findByIdAndDelete(orderid);

    //refund back the user wallet 
    if (payment_method) {
      await userWalletModel.findOneAndUpdate({userid}  ,
        { $inc: { balance: amount } }
      );
    } else {
      await dispatchWalletModel.findOneAndUpdate(
        { dispatchid},
        { $inc: { debt:  -commission_fee } }
      );
    }

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
module.exports = {
    usercreateorderModel , userretrievesingleorderModel  , usercancelorderModel
}