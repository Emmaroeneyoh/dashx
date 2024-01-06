const { handleError } = require("../../dispatch/core/utils");
const {
  bussinessdashboardModel,
  businessretrievesingleorderModel,
  businessretrieveallorderModel,
  bussinessadddispatchModel,
  businessretrievesinglefleetModel,
} = require("../model/dashboard");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { userorderModel } = require("../../user/core/db/order");

const bussinessdashboardController = async (req, res, next) => {
  const { dispatchid } = req.body;
  try {
    const data = { dispatchid };
    let trainee = await bussinessdashboardModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user successfully retrieved",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const bussinessretrievesingleorderController = async (req, res, next) => {
  const { orderid } = req.body;
  try {
    const data = { orderid };
    let trainee = await businessretrievesingleorderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user successfully retrieved",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const bussinessretrieveallorderController = async (req, res, next) => {
  const { dispatchid } = req.body;
  try {
    const data = { dispatchid };
    let trainee = await businessretrieveallorderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user successfully retrieved",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const bussinessretrievefleetrController = async (req, res, next) => {
  const { dispatchid } = req.body;
  try {
    const fleet = await dispatchModel
      .find({ "bussiess.bussinessid": dispatchid })
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user successfully retrieved",
      data: fleet,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const bussinessretrievefleetdetailController = async (req, res, next) => {
  const { dispatchid, fleetid } = req.body;
  try {
    const data = { dispatchid, fleetid };
    let trainee = await businessretrievesinglefleetModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user successfully retrieved",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const bussinessretrievefleetordersController = async (req, res, next) => {
  const { dispatchid, fleetid } = req.body;
  try {
    let trainee = await userorderModel.find({ dispatchid: fleetid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user successfully retrieved",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const bussinessadddispatchController = async (req, res, next) => {
  const { email, password, phone, name, dispatchid, vehicle_type } = req.body;
  try {
    const dispatchEmail = email.toLowerCase();
    const user = await dispatchModel.findOne({ email: dispatchEmail })
    if (user) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "email already exist",
        data: [],
        error: "email already exist",
      });
    }
    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
    const data = {
      dispatchEmail,
      Harshpassword,
      phone,
      name,
      dispatchid,
      vehicle_type,
    };
    let trainee = await bussinessadddispatchModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user successfully retrieved",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  bussinessdashboardController,
  bussinessretrievesingleorderController,
  bussinessretrieveallorderController,
  bussinessadddispatchController,
  bussinessretrievefleetrController,
  bussinessretrievefleetdetailController,  bussinessretrievefleetordersController
};
