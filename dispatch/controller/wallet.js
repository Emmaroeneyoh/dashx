const { dispatchWalletModel } = require("../core/db/wallet");
const { handleError } = require("../core/utils");
const { dispatchwithdrawwalletModel, dispatchwalletfundhistoryModel } = require("../model/wallet");


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
    let comment = await dispatchwalletfundhistoryModel(data, res);
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
  dispatchwithdrawwallethistoryController
};
