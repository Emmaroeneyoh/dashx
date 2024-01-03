const joi = require("joi");
const { handleError } = require("../utils");


const userwithdrawwalletValidation = (req, res, next) => {
  const schema = joi.object({
    userid: joi.string().required(),
    narration: joi.string().required(),
    amount: joi.number().required(),
    destinationBankCode: joi.string().required(),
    destinationAccountNumber: joi.string().required(),
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


const userwallethistoryValidation = (req, res, next) => {
  const schema = joi.object({
    userid: joi.string().required(),
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
    userwithdrawwalletValidation , userwallethistoryValidation
}