const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { userorderModel } = require("../../user/core/db/order");
const { userModel } = require("../../user/core/db/user");

const adminretrievesingleuserModel = async (data, res) => {
  try {
    const { userid } = data;
    const userDetails = await userModel.findById(userid);

    return userDetails;
  } catch (error) {
    return error.message;
  }
};
const adminretrievesingledispatchModel = async (data, res) => {
  try {
    const { dispatchid } = data;
    const userDetails = await dispatchModel.findById(dispatchid);

    return userDetails;
  } catch (error) {
    return error.message;
  }
};
const adminretrievesinglebussinessModel = async (data, res) => {
  try {
    const { dispatchid } = data;
    const userDetails = await dispatchModel.findById(dispatchid);
    const totaldriver = await dispatchModel.countDocuments({
      "bussiess.bussinessid": dispatchid,
    });
    const fleet = await dispatchModel
      .find({
        "bussiess.bussinessid": dispatchid,
      })
      .select("_id");
    const totalorder = await userorderModel.countDocuments({
      dispatchid: { $in: fleet },
    });
    const userData = { totaldriver, userDetails, totalorder };
    return userData;
  } catch (error) {
    return error.message;
  }
};
const adminretrievebussinessdriverModel = async (data, res) => {
  try {
    const { dispatchid } = data;
    const totaldriver = await dispatchModel.find({
      "bussiess.bussinessid": dispatchid,
    });

    return totaldriver;
  } catch (error) {
    return error.message;
  }
};
const adminretrievebussinessorderModel = async (data, res) => {
  try {
    const { dispatchid } = data;
    const fleet = await dispatchModel
      .find({
        "bussiess.bussinessid": dispatchid,
      })
      .select("_id");
    const totalorder = await userorderModel.find({
      dispatchid: { $in: fleet },
    });

    return totalorder;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  adminretrievesingleuserModel,
  adminretrievesingledispatchModel,
  adminretrievesinglebussinessModel,
  adminretrievebussinessdriverModel,
  adminretrievebussinessorderModel,
};
