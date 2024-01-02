const { userorderModel } = require("../core/db/order");
const { userWalletModel } = require("../core/db/wallet");
const {
  usercreateorderModel,
  userretrievesingleorderModel,
} = require("../model/order");

const usercreateorderController = async (req, res, next) => {
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
    receiverlandmark,
    delivery_fee,
    userid,  total_fee
  } = req.body;
    try {
        const city = sendercity.toLowerCase();
    const data = {
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
      receiverlandmark,
      delivery_fee,
      userid,  total_fee
    };
        //check if the customer balance is enough
      const wallet = await userWalletModel.findOne({ userid })
    
    const balance = wallet.balance
      if (total_fee > balance) {
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "insufficient fund",
        });
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
