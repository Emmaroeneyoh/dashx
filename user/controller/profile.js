const bcrypt = require("bcrypt");
const { usersupportModel } = require("../../admin/core/db/user.support");
const { userModel } = require("../core/db/user");

const { handleError } = require("../core/utils");
const { userUpdateprofileModel, userretrieveprofileModel, userUpdatepasswordModel } = require("../model/profile");



const userupdateprofileController = async (req, res, next) => {
  const {  email, phone, name, userid ,  address , longitude , latitude ,  state} =
    req.body;
  const userEmail = email.toLowerCase();
  //check if the email exist already , by confirming if the xist email belongs to the current user

  const user = await userModel.findOne({ email: userEmail });
    if (user) {
        if (user._id != userid) {
            return res.status(200).json({
              status_code: 400,
              status: true,
              message: "email already exist",
              error: "email already exist",
            });
          }
  }
  try {
    const data = {
      userEmail,
      userid,
      phone,
      name,   address , longitude , latitude ,  state
    };

    let trainee = await userUpdateprofileModel(data, res);
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
const userretrievechatController = async (req, res, next) => {
  const { userid } = req.body;
  try {
    let trainee = await usersupportModel.find({userid})
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

const userupdatepasswordController = async (req, res, next) => {
  const { userid, currentpassword, newpassword } = req.body;
  try {
    const customerDetails = await userModel.findById(userid);
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
      userid,
      Harshpassword,
    };

    let trainee = await userUpdatepasswordModel(data, res);

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
  userupdateprofileController,
  userretrieveprofileController,
  userupdatepasswordController,  userretrievechatController 
};
