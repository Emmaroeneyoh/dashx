const joi = require("joi");
const { handleError } = require("../utils");

const dispatchupdatevehicleValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
    vehicle_number: joi.string().required(),
    vehicle_type: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
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


const dispatchupdateprofileValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
    country: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
    name: joi.string().required(),
    kin_name: joi.string().required(),
    kin_number: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
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
const dispatchupdatephotoValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
    photo: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
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
const dispatchValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
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
const dispatchupdatepasswordValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
    newpassword: joi.string().required(),
    currentpassword: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
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
  dispatchupdatevehicleValidation,
  dispatchValidation,
  dispatchupdatephotoValidation,
  dispatchupdateprofileValidation,
  dispatchupdateprofileValidation , dispatchupdatepasswordValidation
};
