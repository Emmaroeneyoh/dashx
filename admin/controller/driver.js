const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { userorderModel } = require("../../user/core/db/order");
const { userModel } = require("../../user/core/db/user");
const { handleError } = require("../core/utils");
const { adminretrievesingledispatchModel } = require("../model/customer");

const adminretrievealldriverController = async (req, res, next) => {
  try {
    let trainee = await dispatchModel.find();
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

const adminretrieveunpproveddriverController = async (req, res, next) => {
  try {

    let trainee = await dispatchModel.find({ dispatch_approved: false });
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
const adminretrieveblockdriverController = async (req, res, next) => {
  try {

    let trainee = await dispatchModel.find({ dispatch_blocked: true });
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
const adminretrieveblockuserController = async (req, res, next) => {
  try {

    let trainee = await userModel.find({ user_blocked: true });
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
const adminretrievesingledriverController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { dispatchid };
    let trainee = await adminretrievesingledispatchModel(data, res);
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
const adminretrieveactivetripController = async (req, res, next) => {
  try {
    let trainee = await userorderModel.find({ order_status: "shipping" });
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
const adminretrievetripController = async (req, res, next) => {
  try {
    let trainee = await userorderModel.find();
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
const adminblockdriverController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { dispatchid };
    await dispatchModel.findByIdAndUpdate(dispatchid, {
      $set: {
        dispatch_blocked: true,
      },
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "dispatch is blocked",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const adminunblockdriverController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { dispatchid };
    await dispatchModel.findByIdAndUpdate(dispatchid, {
      $set: {
        dispatch_blocked: false,
      },
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "dispatch is unblocked",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const adminrejectdispatchrequestController = async (req, res, next) => {
  try {
    const { msg, dispatchid } = req.body;
    const dispatch = await dispatchModel.findById(dispatchid);
    const email = dispatch.email;
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "rejection message sent",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const adminapprovedriverController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { dispatchid };
    await dispatchModel.findByIdAndUpdate(dispatchid, {
      $set: {
        dispatch_approved: true,
      },
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "dispatch request is approved",
   
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  adminunblockdriverController,
  adminblockdriverController,
  adminretrievesingledriverController,
  adminretrievealldriverController,
  adminretrieveunpproveddriverController,
  adminapprovedriverController,
  adminrejectdispatchrequestController,
  adminretrieveactivetripController,
  adminretrievetripController,
  adminretrieveblockuserController, adminretrieveblockdriverController
};
