
const joi = require("joi");
const { handleError } = require("../utils");

const adminmgnuserValidation = (req, res, next) => {
  const schema = joi.object({
    userid: joi.string().required(),
    adminid: joi.string().required(),
   
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


const adminmgndispatchValidation = (req, res, next) => {
  const schema = joi.object({
    dispatchid: joi.string().required(),
    adminid: joi.string().required(),
   
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
    adminmgnuserValidation  , adminmgndispatchValidation
}