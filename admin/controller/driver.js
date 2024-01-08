const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { userorderModel } = require("../../user/core/db/order");
const { userModel } = require("../../user/core/db/user");
const { dispatchsupportModel } = require("../core/db/dispatch.support");
const { handleError } = require("../core/utils");
const {
  adminretrievesingledispatchModel,
  adminretrievesinglebussinessModel,
  adminretrievebussinessdriverModel,
  adminretrievebussinessorderModel,
} = require("../model/customer");

const adminretrievealldriverController = async (req, res, next) => {
  try {
    let trainee = await dispatchModel.find({ personel_account: true });
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
const adminretrieveallbussiessController = async (req, res, next) => {
  try {
    let trainee = await dispatchModel.find({ personel_account: false });
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
const adminretrievesinglebussinessController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { dispatchid };
    let trainee = await adminretrievesinglebussinessModel(data, res);
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
const adminretrievebussinessdriverController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { dispatchid };
    let trainee = await adminretrievebussinessdriverModel(data, res);
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
const adminretrievebussinessorderController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { dispatchid };
    let trainee = await adminretrievebussinessorderModel(data, res);
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
    const { status, orderid } = req.body;
    var query = { $and: [] };
    if (status != "") {
      query.$and.push({ order_status: status });
    }

    if (orderid != "") {
      query.$and.push({ _id: orderid });
    }
    if (query.$and.length == 0) {
      const trip = await userorderModel.find().populate("dispatchid");
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data: trip,
      });
    }
    let trainee = await userorderModel.find(query);
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
    const { startDate, endDate, status, name } = req.body;
    var query = { $and: [] };
    if (status != "") {
      query.$and.push({ order_status: status });
    }
    if (name != "") {
      query.$and.push({ sendername: name });
    }

    if (startDate != "") {
      query.$and.push({ createdAt: { $gte: startDate } });
    }
    if (endDate != "") {
      query.$and.push({ createdAt: { $lte: endDate } });
    }

    if (query.$and.length == 0) {
      const trip = await userorderModel.find().populate("dispatchid");
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data: trip,
      });
    }
    let trainee = await userorderModel.find(query).populate("dispatchid");
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
const adminchatdispatchrController = async (req, res, next) => {
  try {
    const { dispatchid } = req.body;
    const data = { dispatchid };
    const chat = await dispatchsupportModel.find(dispatchid);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "dispatch is blocked",
      chat,
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
  adminretrieveblockuserController,
  adminretrieveblockdriverController,
  adminretrieveallbussiessController,
  adminretrievesinglebussinessController,
  adminretrievebussinessdriverController,
  adminretrievebussinessorderController, adminchatdispatchrController
};
