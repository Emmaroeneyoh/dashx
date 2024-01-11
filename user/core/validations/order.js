const joi = require("joi");
const { handleError } = require("../utils");


const usercreateorderValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    vehicle_type: joi.string().required(),
    sendername: joi.string().required(),
    senderlat: joi.string().required(),
    senderlong: joi.string().required(),
    productname: joi.string().required().allow(''),
    senderphone: joi.string().required(),
    senderaddress: joi.string().required(),
    sendercity: joi.string().required(),
    senderlandmark: joi.string().optional().allow(''),
    userid: joi.string().required(),
    receivername: joi.string().required(),
    receiverphone: joi.string().required(),
    receiveraddress: joi.string().required(),
    receivercity: joi.string().required(),
    receiverlat: joi.string().required(),
    receiverlong: joi.string().required(),
   total_fee: joi.number().required(),
   payment_method: joi.boolean().required(),
  default_sender: joi.boolean().required(),
    receiverlandmark: joi.string().optional().allow(''),
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
