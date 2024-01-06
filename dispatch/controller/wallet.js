const { generateCheckoutURL } = require("../../helper/flutterwave/paystack");
const { dispatchWalletModel } = require("../core/db/wallet");
const { dispatchwallethistoryModel } = require("../core/db/wallethistory");
const { handleError } = require("../core/utils");
const {
  dispatchwithdrawwalletModel,
  dispatchwalletfundhistoryModel,
} = require("../model/wallet");

const dispatchwithdrawwalletController = async (req, res, next) => {
  const { dispatchid, walletid, amount, status, trx_type } = req.body;
  try {
    //check if the dispatch balance is enough
    const wallet = await dispatchWalletModel.findOne({ dispatchid });
    const balance = wallet.balance;
    if (amount > balance) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "insufficient fund",
      });
    }
    const data = {
      dispatchid,
      walletid,
      amount,
      status,
      trx_type,
    };
    let comment = await dispatchwithdrawwalletModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const dispatchwithdrawwallethistoryController = async (req, res, next) => {
  const { dispatchid, walletid } = req.body;
  try {
    const data = {
      dispatchid,
      walletid,
    };
    let comment = await dispatchwallethistoryModel.find({
      dispatchid,
      walletid,
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const dispatchmakepaymentController = async (req, res, next) => {
  const { email, amount, usertype, dispatchid } = req.body;
  try {
    console.log("email", email);
    let comment = await generateCheckoutURL(email, amount, usertype);
    console.log(";psole", comment);
    if (!comment) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "transaction failed",
        data: comment,
      });
    }
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const dispatchretrieveaccountbalanceController = async (req, res, next) => {
  const { dispatchid } = req.body;
  try {
    console.log("poksisue" , dispatchid );
    let comment = await dispatchWalletModel.findOne({ dispatchid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
module.exports = {
  dispatchwithdrawwalletController,
  dispatchwithdrawwallethistoryController,
  dispatchmakepaymentController,
  dispatchretrieveaccountbalanceController
};
