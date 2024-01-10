const { userModel } = require("../../user/core/db/user");
const { usersupportModel } = require("../core/db/user.support");
const { handleError } = require("../core/utils");
const { adminretrievesingleuserModel } = require("../model/customer");

const adminretrievealluserController = async (req, res, next) => {
  try {
    let trainee = await userModel.find();
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
const adminretrievesingleuserController = async (req, res, next) => {
  try {
    const { userid } = req.body;
    const data = { userid };
    let trainee = await adminretrievesingleuserModel(data, res);
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
const adminblockuserController = async (req, res, next) => {
  try {
    const { userid } = req.body;
    const data = { userid };
    await userModel.findByIdAndUpdate(userid, {
      $set: {
        user_blocked: true,
      },
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user is blocked",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const adminuserchatController = async (req, res, next) => {
  try {
    const { userid } = req.body;
    const chat = await usersupportModel.find({ userid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user is blocked",
      data : chat,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const adminuserchathistoryController = async (req, res, next) => {
  try {
    const chat = await usersupportModel.find()
    const userids = chat.map((x) => x.userid)
    const users = await userModel.find({ _id: { $in: userids } }).select('name email ')
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user is blocked",
      data : users
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const adminunblockuserController = async (req, res, next) => {
  try {
    const { userid } = req.body;
    const data = { userid };
    await userModel.findByIdAndUpdate(userid, {
      $set: {
        user_blocked: false,
      },
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user is unblocked",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  adminunblockuserController,
  adminblockuserController,
  adminretrievesingleuserController,
  adminretrievealluserController,
  adminuserchatController, adminuserchathistoryController 
};
