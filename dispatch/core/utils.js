
const jwt = require('jsonwebtoken');
const { userjwt, riderJWT } = require('../../helper/utils');
const { dispatchModel } = require('./db/dispatch');
//create jwt token for users when the signup or login 
const age = Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 60 * 60
const create_dispatch_token = (user) => {
  return jwt.sign({ user }, riderJWT, {
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

// handling error based on objects or string
const checkdata = (data,res) => {
  if (typeof data !== 'object' ) {
    console.log('error occured')
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: data,
      error: data,
    })
  }
 
 
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}
  
  
function generateRandomNumber(length) {
  let result = '';
  const characters = '0123456789';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }

  // Parse the result as an integer before returning
  return parseInt(result, 10);
}


  //generate order tracking id and ensure the the order tracking id doesnt exist
const generatedispatchrauthcode = async () => {
  let id = generateRandomNumber(5)
  console.log(id)
  let checkid = await dispatchModel.findOne({ 'auth.auth_code': id })
  let counter = 0;
  while (checkid) {
    counter++
    console.log('count :' , counter)
    id = generateRandomNumber(6)
    console.log('new id', id)
    checkid = await dispatchModel.findOne({  "auth.auth_code": id })
  }
  return id
  }
module.exports = {
    create_dispatch_token , handleError , checkdata , generateRandomString , generatedispatchrauthcode
}