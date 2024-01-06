const { dispatchModel } = require("../../dispatch/core/db/dispatch");
const { bussinessUpdateprofileModel } = require("../model/monitor");

const bussinessupdatdispatchController = async (req, res, next) => {
  const { phone, name, fleetid, vehicle_type } = req.body;
  try {
    const data = {
      phone,
      name,
      fleetid,
      vehicle_type,
    };
    let trainee = await bussinessUpdateprofileModel(data, res);
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

const bussinessblockdispatchController = async (req, res, next) => {
  try {
    const { fleetid } = req.body;
    const data = { fleetid };
    await dispatchModel.findByIdAndUpdate(fleetid, {
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
const bussinessunblockdispatchController = async (req, res, next) => {
  try {
    const { fleetid } = req.body;
    const data = { fleetid };
    await dispatchModel.findByIdAndUpdate(fleetid, {
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
// const bussinessretrieveactiveorderController = async (req, res, next) => {
//   try {

//  const activeorder =   await userorderMod.find({order_status :'shipping'});
//     return res.status(200).json({
//       status_code: 200,
//       status: true,
//       message: "dispatch is blocked",
//     });
//   } catch (error) {
//     console.log(error);
//     return handleError(error.message)(res);
//   }
// };

module.exports = {
  bussinessupdatdispatchController,
  bussinessblockdispatchController, bussinessunblockdispatchController 
};
