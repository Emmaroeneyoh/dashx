const {
  dispatchwallethistoryModel,
} = require("../../dispatch/core/db/wallethistory");
const { generatesystembalance } = require("../../helper/flutterwave/paystack");
const { userwallethistoryModel } = require("../../user/core/db/wallethistory");
const { admindashboardModel } = require("../model/dashboard");

const admindashbaordController = async (req, res, next) => {
  try {
    const data = "pois";
    let trainee = await admindashboardModel(data, res);
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

const admindispatchtransactionController = async (req, res, next) => {
  try {
    let dispatchfinace = await dispatchwallethistoryModel.find().populate({
      path: "dispatchid",
      select: "name email", // Include only 'name' and 'email' fields from the User document
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: dispatchfinace,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const adminusertransactionController = async (req, res, next) => {
  try {
    let dispatchfinace = await userwallethistoryModel.find().populate({
      path: "userid",
      select: "name email", // Include only 'name' and 'email' fields from the User document
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: dispatchfinace,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const adminssyetembalanceController = async (req, res, next) => {
  try {
    let dispatchfinace = await generatesystembalance();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: dispatchfinace,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  admindashbaordController,
  admindispatchtransactionController,
  adminusertransactionController, adminssyetembalanceController 
};
