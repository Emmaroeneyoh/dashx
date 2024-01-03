const { sellerWalletModel, userWalletModel } = require("../core/db/wallet");
const { handleError } = require("../core/utils");
const {
  userwithdrawwalletModel,
  userwalletfundhistoryModel,
  userfundwalletModel,
  userretrievebankaccountModel,
  userretrieveaccountbalanceModel,
} = require("../model/wallet");

const userwithdrawwalletController = async (req, res, next) => {
  const { userid, walletid, amount, status, trx_type } = req.body;
  try {
    //check if the user balance is enough
    const wallet = await userWalletModel.findOne({ userid });
    const balance = wallet.balance;
    if (amount > balance) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "insufficient fund",
      });
    }
    const data = {
      userid,
      walletid,
      amount,
      status,
      trx_type,
    };
    let comment = await userwithdrawwalletModel(data, res);
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

const userwithdrawwallethistoryController = async (req, res, next) => {
  const { userid, walletid } = req.body;
  try {
    const data = {
      userid,
      walletid,
    };
    let comment = await userwalletfundhistoryModel(data, res);
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

const userfundwalletController = async (req, res, next) => {
  const { userid, walletid, amount, status, trx_type } = req.body;
  try {
    const data = {
      userid,
      walletid,
      amount,
      status,
      trx_type,
    };
    let comment = await userfundwalletModel(data, res);
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
const userretrievebankaccountController = async (req, res, next) => {
  const { userid } = req.body;
  try {
    const data = {
      userid,
    };
    let comment = await userretrievebankaccountModel(data, res);
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
const userretrieveaccountbalanceController = async (req, res, next) => {
  const { userid } = req.body;
  try {
    const data = {
      userid,
    };
    let comment = await userretrieveaccountbalanceModel(data, res);
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
  userwithdrawwalletController,
  userwithdrawwallethistoryController,
  userfundwalletController,
  userretrievebankaccountController,  userretrieveaccountbalanceController
};
