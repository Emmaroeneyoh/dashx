const { dispatchWalletModel } = require("../core/db/wallet");
const { dispatchwallethistoryModel } = require("../core/db/wallethistory");



const dispatchwithdrawwalletModel = async (data, res) => {
  try {
    const { dispatchid, walletid, amount, status , trx_type } = data;

    //add to wallet history
    const form = await new dispatchwallethistoryModel({
      dispatchid,
      walletid,
      status,
      amount, trx_type
    });
    await form.save();

    if (status) {
      await dispatchWalletModel.findOneAndUpdate(
        { dispatchid, _id: walletid },
        { $inc: { balance: -amount } }
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
    dispatchwalletfundhistoryModel , dispatchwithdrawwalletModel
};
