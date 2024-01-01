const { dispatchModel } = require("../core/db/dispatch");

const dispatchUpdatevehicleModel = async (data, res) => {
  try {
    const { vehicle_number, vehicle_type, dispatchid } = data;

    const form = await dispatchModel.findByIdAndUpdate(dispatchid, {
      $set: {
        vehicle: {
          vehicle_number,
          vehicle_type,
        },
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};


const dispatchretrieveprofileModel = async (data, res) => {
  try {
    const {  dispatchid } = data;

    const form = await dispatchModel.findById(dispatchid);

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const dispatchUpdatephotoModel = async (data, res) => {
  try {
    const { photo, dispatchid } = data;

    const form = await dispatchModel.findByIdAndUpdate(dispatchid, {
      $set: {
        photo,
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const dispatchUpdateprofileModel = async (data, res) => {
  try {
    const {
      riderEmail,
      country,
      dispatchid,
      phone,
      name,
      kin_name,
      kin_number,
    } = data;

    const form = await dispatchModel.findByIdAndUpdate(dispatchid, {
      $set: {
        country,
        email: riderEmail,
        phone,
        name,
        kin: { kin_name, kin_number },
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const dispatchcheckprofileModel = async (data) => {
  try {
    const rider = await dispatchModel.findById(data);
    if (
      !rider.photo ||
      !rider.vehicle.vehicle_number ||
      !rider.vehicle.vehicle_type ||
      !rider.kin.kin_number ||
      !rider.kin.kin_name
    ) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("error", error);
    return error.message;
    // return handleError(error)
  }
};


const dispatchUpdatepasswordModel = async (data, res) => {
    try {
      const { dispatchid, Harshpassword } = data;
  
      const form = await dispatchModel.findByIdAndUpdate(dispatchid, {
        $set: {
          password: Harshpassword,
        },
      });
  
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
  };
  
module.exports = {
  dispatchUpdatevehicleModel,
  dispatchUpdatephotoModel,
  dispatchUpdateprofileModel,
  dispatchcheckprofileModel,  dispatchretrieveprofileModel , dispatchUpdatepasswordModel
};
