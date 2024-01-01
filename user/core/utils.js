
const jwt = require('jsonwebtoken');
const { userjwt, riderJWT } = require('../../helper/utils');
//create jwt token for users when the signup or login 
const age = 1 * 24 * 60 * 60;
const create_user_token = (user) => {
  return jwt.sign({ user }, userjwt, {
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
// const crypto = require('crypto');

// // Encryption
// function encryptcard(value, secretKey) {
//   const cipher = crypto.createCipher('aes-256-cbc', secretKey);
//   let encrypted = cipher.update(value, 'utf-8', 'hex');
//   encrypted += cipher.final('hex');
//   return encrypted;
// }

// // Decryption
// function decryptcard(encryptedValue, secretKey) {
//   const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
//   let decrypted = decipher.update(encryptedValue, 'hex', 'utf-8');
//   decrypted += decipher.final('utf-8');
//   return decrypted;
// }



module.exports = {
    create_user_token , handleError , checkdata , generateRandomString
}