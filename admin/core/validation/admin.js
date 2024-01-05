const joi = require("joi");
const { handleError } = require("../utils");

const adminupdatesubadminprofilValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    subadminid: joi.string().required(),
    adminid: joi.string().required(),
    name: joi.string().required(),
    phone: joi.string().required(),
    roles: joi.array().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return handleError(err)(res);
  }
  return next();
};

const adminupdateprofilValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    adminid: joi.string().required(),
    name: joi.string().required(),
    phone: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return handleError(err)(res);
  }
  return next();
};
const adminupdatepasswordValidation = (req, res, next) => {
  const schema = joi.object({
    currentpassword: joi.string().required(),
    adminid: joi.string().required(),
    newpassword: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return handleError(err)(res);
  }
  return next();
};
const adminrejectdispatchrequestValidation = (req, res, next) => {
  const schema = joi.object({
    msg: joi.string().required(),
    adminid: joi.string().required(),
    dispatchid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return handleError(err)(res);
  }
  return next();
};

module.exports = {
  adminupdatesubadminprofilValidation,
  adminupdateprofilValidation,
  adminupdatepasswordValidation,  adminrejectdispatchrequestValidation
};
