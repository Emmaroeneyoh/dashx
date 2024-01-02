const { adminModel } = require("../core/db/admin");

const adminupdatesubadminprofileModel = async (data, res) => {
  try {
    const {      userEmail,
        phone, name, subadminid} = data;

    const form = await adminModel.findByIdAndUpdate(subadminid, {
      $set: {
        email: userEmail,
        phone,
        name,
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const adminupdateprofileModel = async (data, res) => {
  try {
    const {   userEmail,
        phone, name, adminid , roles} = data;

    const form = await adminModel.findByIdAndUpdate(adminid, {
      $set: {
        email: userEmail,
        phone,
        name, roles
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const adminUpdatepasswordModel = async (data, res) => {
  try {
    const { adminid, Harshpassword } = data;

    const form = await adminModel.findByIdAndUpdate(adminid, {
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
  adminupdatesubadminprofileModel , adminupdateprofileModel , adminUpdatepasswordModel
};
