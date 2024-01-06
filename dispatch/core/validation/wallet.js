const joi = require("joi");
const { handleError } = require("../utils");


const dispatchfundwalletValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
    email: joi.string().required(),
    amount: joi.number().required(),
    usertype: joi.string().required(),
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



const dispatchwallethistoryValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
    walletid: joi.string().required(),
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
  dispatchfundwalletValidation , dispatchwallethistoryValidation 
}