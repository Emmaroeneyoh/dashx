const joi = require("joi");
const { handleError } = require("../utils");


const usercreateorderValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    vehicle_type: joi.string().required(),
    sendername: joi.string().required(),
    productname: joi.string().required(),
    senderphone: joi.string().required(),
    senderaddress: joi.string().required(),
    sendercity: joi.string().required(),
    senderlandmark: joi.string().optional(),
    userid: joi.string().required(),
    delivery_fee: joi.number().required(),
    total_fee: joi.number().required(),
    receivername: joi.string().required(),
    receiverphone: joi.string().required(),
    receiveraddress: joi.string().required(),
    receivercity: joi.string().required(),
    receiverlandmark: joi.string().optional(),
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


const userretrievesingleorderValidation = (req, res, next) => {
  const schema = joi.object({
    userid: joi.string().required(),
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

module.exports = {
    usercreateorderValidation , userretrievesingleorderValidation
};
