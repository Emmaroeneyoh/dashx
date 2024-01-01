const { dispatchModel } = require("../../dispatch/core/db/dispatch");
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
const adminretrievesingledriverController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { driverid };
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
      message: "signup process successful",
      data: trainee,
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
      message: "signup process successful",
      data: trainee,
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
      message: "signup process successful",
      data: trainee,
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
};
