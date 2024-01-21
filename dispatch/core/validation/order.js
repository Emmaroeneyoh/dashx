const joi = require("joi");

const dashxcreateorderValidation = (req, res, next) => {
  const schema = joi.object({
    shipping_address: joi.string().required(),
    productname: joi.string().required(),
    productcity: joi.string().required(),
    dashxid: joi.string().required(),
    productaddress: joi.string().required(),
    altid: joi.string().required(),
    phone: joi.string().required(),
    delivery_vehicle: joi.string().required(),
    total_weight: joi.number().required(),
    total_area: joi.number().required(),
    quantity: joi.number().required(),
    delivery_fee: joi.number().required(),
    commision_fee: joi.number().required(),
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
const dispatchacceptorderValidation = (req, res, next) => {
  const schema = joi.object({
    orderid: joi.string().required(),
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
const dispatchlistorderValidation = (req, res, next) => {
  const schema = joi.object({
    city: joi.string().required(),
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
const dispatchaddordereventValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
    orderid: joi.string().required(),
    event: joi.string().required(),
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
const dispatchpickuporderValidation = (req, res, next) => {
  const schema = joi.object({
    upload: joi.array().required(),
    orderid: joi.string().required(),
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
const dispatchdeliverorderValidation = (req, res, next) => {
  const schema = joi.object({
    ordercode: joi.string().required(),
    orderid: joi.string().required(),
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
const dispatchstartorderValidation = (req, res, next) => {
  const schema = joi.object({
    orderid: joi.string().required(),
    dispatchid: joi.string().required(),
    totalkm: joi.number().required(),
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
  dashxcreateorderValidation,
  dispatchacceptorderValidation,
  dispatchaddordereventValidation,
  dispatchpickuporderValidation,
  dispatchdeliverorderValidation,
  dispatchstartorderValidation, dispatchlistorderValidation
};
