const { generateCheckoutURL } = require("../../helper/flutterwave/paystack");
const { userModel } = require("../core/db/user");
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
    const {
      
    userid,
    amount,
    narration,
    destinationBankCode,
    destinationAccountNumber,
    } = req.body;
  try {
    //check if the user balance is enough
    // const wallet = await userWalletModel.findOne({ userid });
    // const balance = wallet.balance;
    // if (amount > balance) {
    //   return res.status(400).json({
    //     status_code: 400,
    //     status: false,
    //     message: "insufficient fund",
    //   });
    // }
    const data = {
      userid,
      amount,
      narration,
      destinationBankCode,
      destinationAccountNumber,
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
  const { data , customer } = req.body;
  try {
    const usertype = data.metadata.usertype
    if (usertype == 'user') {
      const email = data.customer.email
      const userEmail = email.toLowerCase();
      const user = await userModel.findOne({ email: userEmail })
      const userid = user._id
      const wallet = await userWalletModel.findOne({ userid })
      const walletid = wallet._id
      const amount = data.amount
      const status = data.status
      const transid = data.id
      const transref= data.reference
      const datas = {
        userid,
        walletid,
        amount,
        status, transid , transref
      };
      let comment = await userfundwalletModel(datas, res);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully "
      });
    } else {
      const email = data.customer.email
      const userEmail = email.toLowerCase();
      const user = await userModel.findOne({ email: userEmail })
      const userid = user._id
      const wallet = await userWalletModel.findOne({ userid })
      const walletid = wallet._id
      const amount = data.amount
      const status = data.status
      const transid = data.id
      const transref= data.reference
      const datas = {
        userid,
        walletid,
        amount,
        status, transid , transref
      };
      let comment = await userfundwalletModel(datas, res);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully "
      });
    }
   
  
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const usermakepaymentController = async (req, res, next) => {
  const { email , amount , usertype , userid } = req.body;
  try {
    console.log('email' , email)
    let comment = await generateCheckoutURL(email, amount, usertype)
    console.log(';psole' , comment)
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
  userretrievebankaccountController,
  userretrieveaccountbalanceController,  usermakepaymentController
};
