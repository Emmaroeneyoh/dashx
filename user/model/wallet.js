const {
  getVirtualAccountDetails,
  getBankDetails,
  retrievebalance,
} = require("../../helper/flutterwave/retrieve");
const { transfer } = require("../../helper/flutterwave/transfers");
const { userWalletModel } = require("../core/db/wallet");
const { userwallethistoryModel } = require("../core/db/wallethistory");

const userwithdrawwalletModel = async (data, res) => {
  try {
    const {
      userid,
      amount,
      narration,
      destinationBankCode,
      destinationAccountNumber,
    } = data;

    // //add to wallet history
    // const form = await new userwallethistoryModel({
    //   userid,
    //   walletid,
    //   status,
    //   amount,
    //   trx_type,
    // });
    // await form.save();

    // if (status) {
    //   await userWalletModel.findOneAndUpdate(
    //     { userid, _id: walletid },
    //     { $inc: { balance: -amount } }
    //   );
    // }
      const wallet = await userWalletModel.findOne({ userid })
      const account_number = wallet.account_number
      const sourceAccountNumber = '9964840075'
    const banktransfer = await transfer(
      amount,
      narration,
      destinationBankCode,
      destinationAccountNumber,
      sourceAccountNumber 
    );

    return banktransfer;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const userfundwalletModel = async (datas, res) => {
  try {
    const {  userid,
      walletid,
      amount,
      status, transid , transref} = datas;
  
    //add to wallet history
    const form = await new userwallethistoryModel({
      userid,
      walletid,
      amount,
      paystackid : transid  , transref  , status
    });
    await form.save();

    if (status == 'success') {
      await userWalletModel.findOneAndUpdate(
        { userid, _id: walletid },
        { $inc: { balance: amount } }
      );
    }

    return "order";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const userwalletfundhistoryModel = async (data, res) => {
  try {
    const { userid, walletid } = data;

    const wallethistory = await userwallethistoryModel.find({
      userid,
      walletid,
    });

    return wallethistory;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const userretrievebankaccountModel = async (data, res) => {
  try {
    const { userid } = data;

    const wallethistory = await userWalletModel.findOne({
      userid,
    });
    const accountnumber = wallethistory.account_number;

    return details;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const userretrieveaccountbalanceModel = async (data, res) => {
  try {
    const { userid } = data;

    const wallethistory = await userWalletModel.findOne({
      userid,
    });
    const accountnumber = wallethistory.account_number;
    const reference = wallethistory.reference_number;
    console.log("aos", accountnumber);
    const details = await retrievebalance(reference, accountnumber);

    return details;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  userwithdrawwalletModel,
  userwalletfundhistoryModel,
  userfundwalletModel,
  userretrievebankaccountModel,
  userretrieveaccountbalanceModel,
};
