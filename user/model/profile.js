const { userModel } = require("../core/db/user");

const userUpdateprofileModel = async (data, res) => {
  try {
    const {
      userEmail,
      userid,
      phone,
      name,
      address,
      longitude,
      latitude,
      state,  city
    } = data;

    const form = await userModel.findByIdAndUpdate(userid, {
      $set: {
        email: userEmail,
        phone,
        name,
        address,
        longitude,
        latitude,
        state,  city
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const userUpdatepasswordModel = async (data, res) => {
  try {
    const { userid, Harshpassword } = data;

    const form = await userModel.findByIdAndUpdate(userid, {
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

const userretrieveprofileModel = async (data, res) => {
  try {
    const { userid } = data;

    const form = await userModel.findById(userid);

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  userUpdateprofileModel,
  userretrieveprofileModel,
  userUpdatepasswordModel,
};
