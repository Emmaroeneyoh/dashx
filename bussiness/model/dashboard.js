const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { dispatchWalletModel } = require("../../dispatch/core/db/wallet");
const { userorderModel } = require("../../user/core/db/order");

const bussinessdashboardModel = async (data, res) => {
  try {
    const { dispatchid } = data;
    const fleet = await dispatchModel
      .countDocuments({ "bussiess.bussinessid": dispatchid })
    const totalfleet = await dispatchModel
      .find({ "bussiess.bussinessid": dispatchid })
    const activerider = await dispatchModel
      .countDocuments({ "bussiess.bussinessid": dispatchid, driver_status: "online" });
    const ids = totalfleet.map((x) => x._id);
    const totalorders = await userorderModel.countDocuments({ dispatchid: { $in: ids } });
    const activeorders = await userorderModel.countDocuments({
      dispatchid: { $in: ids },
      order_status: "shipping",
    });
    const deliveryhistory = await userorderModel
      .find({ dispatchid: { $in: ids }, order_status: "delivered" })
      .limit(10);
    // const review = await productreviewModel.find({productid})
    //  const data = { product , review}
    const datas = {
      fleet,
      activerider,
      totalorders,
      activeorders,
      deliveryhistory,
    };
    return datas;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};
const businessretrieveallorderModel = async (data, res) => {
  try {
    const { dispatchid } = data;
    const fleet = await dispatchModel
      .find({ "bussiess.bussinessid": dispatchid })
      .select("name");
    const activerider = await dispatchModel
      .find({ "bussiess.bussinessid": dispatchid, driver_status: "online" })
      .select("name");
    const ids = fleet.map((x) => x._id);
    const totalorders = await userorderModel.find({ dispatchid: { $in: ids } });
    const orderhistory = await userorderModel.find({
      dispatchid: { $in: ids },
    }).populate('dispatchid')

    return orderhistory;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};
const businessretrievesinglefleetModel = async (data, res) => {
  try {
    const { dispatchid, fleetid } = data;
    const fleet = await dispatchModel.findById(fleetid);
 
    const totalorder = await userorderModel.countDocuments({dispatchid}).populate('dispatchid')
    const totalamount = 500;
    const fleetdata = { fleet, totalorder, totalamount };
    return fleetdata;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};

const businessretrievesingleorderModel = async (data, res) => {
  try {
    const { orderid } = data;
    const order = await userorderModel.findById(orderid).populate("dispatchid");
    return order;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};

const bussinessadddispatchModel = async (data, res) => {
  try {
    const {
      dispatchEmail,
      Harshpassword,
      phone,
      name,
      dispatchid,
      vehicle_type,
    } = data;
    const form = await new dispatchModel({
      email: dispatchEmail,
      password: Harshpassword,
      phone,
      name,
      dispatch_approved : true,
      "bussiess.bussiness_type": true,
      "bussiess.bussinessid": dispatchid,
      "auth.auth_verified": true,
      "vehicle.vehicle_type": vehicle_type,
    });

    const userDetails = await form.save();
    const wallet =   await new dispatchWalletModel ({
      dispatchid : userDetails._id
      
    });
   const userwallet =   await wallet.save()

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  bussinessdashboardModel,
  businessretrievesingleorderModel,
  businessretrieveallorderModel,
  bussinessadddispatchModel,
  businessretrievesinglefleetModel,
};
