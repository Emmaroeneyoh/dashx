const joi = require('joi')


const userupdatepasswordValidation = (req, res, next) => {
    const schema = joi.object({
      userid: joi.string().required(),
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
  


const userupdateprofileValidation = (req, res, next) => {
    const schema = joi.object({
      userid: joi.string().required(),
      email: joi.string().required(),
      phone: joi.string().required(),
      name: joi.string().required(),
      address: joi.string().required(),  
      longitude: joi.string().required(),
      latitude: joi.string().required(), 
      state: joi.string().required(), 
      city: joi.string().required(), 
      
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
    userupdateprofileValidation ,  userupdatepasswordValidation
}