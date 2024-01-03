const joi = require('joi')

const adminpriceValidation = (req, res, next) => {
    const schema = joi.object({
        adminid: joi.string().required(),
        truck: joi.number().required(),
        bike: joi.number().required(),
        car: joi.number().required(),
        van: joi.number().required(),
        comision: joi.number().required(),
        price_per_km: joi.number().required(),
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
    adminpriceValidation
}