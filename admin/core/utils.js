
const jwt = require('jsonwebtoken');
const {  adminJWT } = require('../../helper/utils');
//create jwt token for users when the signup or login 
const age = 1 * 24 * 60 * 60;
const create_admin_token = (user) => {
  return jwt.sign({ user }, adminJWT, {
    expiresIn: age,
  });
};
const handleError = (err) => res => {
  return res.status(400).json({
    status_code: 400,
    status: false,
    message: err,
    data: [],
    error: err,
  });
}







module.exports = {
    create_admin_token , handleError 
}