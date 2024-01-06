const { dispatchWalletModel } = require("../core/db/wallet");
const { dispatchwallethistoryModel } = require("../core/db/wallethistory");



const dispatchfundwalletModel = async (datas, res) => {
  try {
    const {  dispatchid,
      walletid,
      amount,
      status, transid , transref} = datas;

    //add to wallet history
    const form = await new dispatchwallethistoryModel({
      dispatchid,
      walletid,
      amount,
      paystackid : transid  , transref 
    });
    await form.save();

    if (status == 'success') {
      await dispatchWalletModel.findOneAndUpdate(
        {dispatchid, _id: walletid },
        { $inc: { balance: amount } }
      );
    }

    return "order";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};



const dispatchwalletfundhistoryModel = async (data, res) => {
  try {
    const { dispatchid, walletid } = data;

    const wallethistory = await dispatchwallethistoryModel.find({
      dispatchid,
      walletid,
    });

    return wallethistory;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
    dispatchwalletfundhistoryModel , dispatchfundwalletModel
};
