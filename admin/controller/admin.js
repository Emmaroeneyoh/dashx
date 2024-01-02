const bcrypt = require("bcrypt");
const { adminModel } = require("../core/db/admin");
const { handleError } = require("../core/utils");
const { adminupdatesubadminprofileModel, adminupdateprofileModel, adminUpdatepasswordModel } = require("../model/admin");



const adminupdatesubadminprofileController = async (req, res, next) => {
  const {  email, phone, name, subadminid , roles} =
    req.body;
  const userEmail = email.toLowerCase();

  try {
    const data = {
      userEmail,
    phone, name, subadminid , roles
    };

    let trainee = await adminupdatesubadminprofileModel(data, res);
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
const adminupdateprofileController = async (req, res, next) => {
  const {  email, phone, name, adminid} =
    req.body;
  const userEmail = email.toLowerCase();

  try {
    const data = {
      userEmail,
      phone, name, adminid
    };

    let trainee = await adminupdateprofileModel(data, res);
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

const userretrieveprofileController = async (req, res, next) => {
  const { userid } = req.body;
  try {
    const data = { userid };
    let trainee = await userretrieveprofileModel(data, res);
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

const adminupdatepasswordController = async (req, res, next) => {
  const { adminid, currentpassword, newpassword } = req.body;
  try {
    const customerDetails = await adminModel.findById(adminid);
    if (!customerDetails) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "admin dont exist on our application",
        data: [],
        error: "admin dont exist on our application",
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
    adminid,
      Harshpassword,
    };

    let trainee = await adminUpdatepasswordModel(data, res);

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
    adminupdatesubadminprofileController,
    adminupdateprofileController ,
  userretrieveprofileController,
  adminupdatepasswordController 
};
