const joi = require("joi");

const bussinessretrievesingleorderValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    dispatchid: joi.string().required(),
    orderid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    let errlen = err.split(" ");
    console.log("this is length ", errlen.length);
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: err,
      data: [],
      error: err,
    });
  }
  return next();
};
const bussinessretrievesinglefleetValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    dispatchid: joi.string().required(),
    fleetid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    let errlen = err.split(" ");
    console.log("this is length ", errlen.length);
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: err,
      data: [],
      error: err,
    });
  }
  return next();
};
const bussinessadddispatchValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    dispatchid: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    name: joi.string().required(),
    phone: joi.string().required(),
    vehicle_type: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    let errlen = err.split(" ");
    console.log("this is length ", errlen.length);
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: err,
      data: [],
      error: err,
    });
  }
  return next();
};
const bussinessupdatedispatchValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    dispatchid: joi.string().required(),
    fleetid: joi.string().required(),
    name: joi.string().required(),
    phone: joi.string().required(),
    vehicle_type: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    let errlen = err.split(" ");
    console.log("this is length ", errlen.length);
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: err,
      data: [],
      error: err,
    });
  }
  return next();
};

module.exports = {
  bussinessretrievesingleorderValidation,
  bussinessretrievesinglefleetValidation,
  bussinessadddispatchValidation,   bussinessupdatedispatchValidation
};
