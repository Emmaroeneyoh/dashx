const { dispatchModel } = require("../core/db/dispatch");
const bcrypt = require("bcrypt");
const {
  dispatchUpdatevehicleModel,
  dispatchUpdatephotoModel,
  dispatchUpdateprofileModel,
  dispatchretrieveprofileModel,
  dispatchUpdatepasswordModel,
} = require("../model/profile");
const { handleError } = require("../core/utils");

const dispatchupdatevehicleController = async (req, res, next) => {
  const { vehicle_number, vehicle_type, dispatchid  , driving_license} = req.body;
  try {
    const data = {
      vehicle_number,
      vehicle_type,
      dispatchid, driving_license
    };

    let trainee = await dispatchUpdatevehicleModel(data, res);
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

const dispatchupdatephotoController = async (req, res, next) => {
  const { photo, dispatchid } = req.body;
  try {
    const data = {
      photo,
      dispatchid,
    };

    let trainee = await dispatchUpdatephotoModel(data, res);
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

const dispatchupdateprofileController = async (req, res, next) => {
  const { country, email, phone, name, dispatchid, kin_name, kin_number } =
    req.body;
  const riderEmail = email.toLowerCase();
  //check if the email exist already , by confirming if the xist email belongs to the current user

  const rider = await dispatchModel.findOne({ email: riderEmail });
  if (rider._id != dispatchid) {
    return res.status(200).json({
      status_code: 400,
      status: true,
      message: "email already exist",
      error: "email already exist",
    });
  }
  try {
    const data = {
      riderEmail,
      country,
      dispatchid,
      phone,
      name,
      kin_name,
      kin_number,
    };

    let trainee = await dispatchUpdateprofileModel(data, res);
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

const dispatchretrieveprofileController = async (req, res, next) => {
  const { dispatchid } = req.body;
  try {
    const data = { dispatchid };
    let trainee = await dispatchretrieveprofileModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "dispatch successfully retrieved",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const dispatchupdatepasswordController = async (req, res, next) => {
  const { dispatchid, currentpassword, newpassword } = req.body;
  try {
    const customerDetails = await dispatchModel.findById(dispatchid);
    if (!customerDetails) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "user dont exist on our application",
        data: [],
        error: "user dont exist on our application",
      });
    }

    const checkPassword = await bcrypt.compare(
      currentpassword,
      customerDetails.password
    );
    if (!checkPassword) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "incorrect password",
        data: [],
        error: "incorrect password",
      });
    }
    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(newpassword, salt);
    const data = {
      dispatchid,
      Harshpassword,
    };

    let trainee = await dispatchUpdatepasswordModel(data, res);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "login process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
module.exports = {
  dispatchupdatevehicleController,
  dispatchupdatephotoController,
  dispatchupdateprofileController,
  dispatchretrieveprofileController,
  dispatchupdatepasswordController,
};
