const { ordercodemodel } = require("../../dispatch/core/db/order_code");
const { userorderModel } = require("../core/db/order");
const { userModel } = require("../core/db/user");
const { userWalletModel } = require("../core/db/wallet");
const {
  usercreateorderModel,
  userretrievesingleorderModel,
} = require("../model/order");

const usercreateorderController = async (req, res, next) => {
let {
    vehicle_type,
    sendername,
    productname,
    senderphone,
      senderaddress,
      senderlat,
      senderlong,
    sendercity,
    senderlandmark,
    receivername,
    receiverphone,
    receiveraddress,
    receivercity,
    receiverlandmark,
    receiverlat,
    receiverlong,
    userid,  total_fee , payment_method , default_sender
  } = req.body;
 
  try {
    const sender = await userModel.findById(userid)

    if (default_sender) {
       sendername = sender.name
    }
        const city = sendercity.toLowerCase();
    const data = {
      vehicle_type,
      sendername,
      productname,
      senderphone,
        senderaddress,
        senderlat,
        senderlong, 
        receiverlat,
        receiverlong,
     city,
      senderlandmark,
      receivername,
      receiverphone,
      receiveraddress,
      receivercity,
      receiverlandmark,
      userid,  total_fee , payment_method
    };
        //check if the customer balance is enough
      if (payment_method) {
        const wallet = await userWalletModel.findOne({ userid })
    
        const balance = wallet.balance
          if (total_fee > balance) {
            return res.status(400).json({
              status_code: 400,
              status: false,
              message: "insufficient fund",
            });
          }
      }
   
    let trainee = await usercreateorderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: "order created",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const userretrievesingleorderController = async (req, res, next) => {
  const { orderid } = req.body;
  try {
    const data = {
      orderid,
    };
    let trainee = await userretrievesingleorderModel(data, res);
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
const userretrieveallorderController = async (req, res, next) => {
  const { userid } = req.body;
  try {
    let trainee = await userorderModel.find({ userid });
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
  usercreateorderController,
  userretrievesingleorderController,
  userretrieveallorderController,
};
