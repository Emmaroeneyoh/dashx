const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { userorderModel } = require("../../user/core/db/order");
const { userModel } = require("../../user/core/db/user");

const admindashboardModel = async (data, res) => {
  try {
    const totalrider = await userorderModel.countDocuments();
    const onlinedriver = await dispatchModel.countDocuments({
      personel_account: true,
      dispatch_approved: true,
    });
    const offlinedriver = await dispatchModel.countDocuments({
      personel_account: true,
      dispatch_approved: false,
    });
    const bussiness = await dispatchModel.countDocuments({
      personel_account: false,
    });

    const activerider = await dispatchModel.countDocuments({
      dispatch_blocked: false,
    });
    const totaluser = await userModel.countDocuments();
    const activeuser = await userModel.countDocuments({ user_blocked: false });
    const activetrips = await userorderModel.countDocuments({
      order_status: { $ne: "delivered" },
    });

    const datas = {
      totalrider,
      onlinedriver,
      offlinedriver,
      activerider,
      totaluser,
      activeuser,
      activetrips,
      bussiness,
    };

    return datas;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  admindashboardModel,
};
