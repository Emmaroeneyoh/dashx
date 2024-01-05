const { adminModel } = require("../core/db/admin");
const bcrypt = require("bcrypt");
const {
  admincreateadminModel,
  adminaddroleModel,
  adminremoveroleModel,
} = require("../model/hr");
const { handleError } = require("../core/utils");

const admincreateadminController = async (req, res, next) => {
  const { name, email, password, phone, roles } = req.body;
  const adminEmail = email.toLowerCase();

  try {
    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
    const admin = await adminModel.findOne({ email: adminEmail });
    if (admin) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "email already exist",
        data: [],
        error: "email already exist",
      });
    }

    const data = {
      name,
      adminEmail,
      Harshpassword,
      phone,
      roles,
    };

    let trainee = await admincreateadminModel(data, res);
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

const adminaddroleController = async (req, res, next) => {
  const { subadminid, role } = req.body;
  try {
    const admin = await adminModel.findById(subadminid);
    const adminroles = admin.roles;
    const checkrole = adminroles.find((x) => {
      return x.role == role;
    });
    if (checkrole) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "admin has that role already",
        data: [],
        error: "admin has that role already",
      });
    }
    const data = {
      subadminid,
      role,
    };

    let trainee = await adminaddroleModel(data, res);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "role added",
      // data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const adminremoveroleController = async (req, res, next) => {
  const { subadminid, role } = req.body;
  try {
    const data = {
      subadminid,
      role,
    };

    let trainee = await adminremoveroleModel(data, res);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "role removed",
      // data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const adminretrieveadminsController = async (req, res, next) => {
  try {
    let trainee = await adminModel.find();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "role removed",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};


const adminblocksubadminController = async (req, res, next) => {
    try {
      const { subadminid } = req.body;
      const data = { subadminid };
      await adminModel.findByIdAndUpdate(subadminid, {
        $set: {
         admin_blocked: true,
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
  
const adminunblocksubadminController = async (req, res, next) => {
    try {
      const { subadminid } = req.body;
      const data = { subadminid };
      await adminModel.findByIdAndUpdate(subadminid, {
        $set: {
         admin_blocked: false
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
  
module.exports = {
  admincreateadminController,
  adminremoveroleController,
    adminaddroleController, adminretrieveadminsController,
    adminunblocksubadminController , adminblocksubadminController
};
