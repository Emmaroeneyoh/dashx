const jwt = require('jsonwebtoken');
const { riderJWT } = require('../../helper/utils');
const { dispatchModel } = require('./db/dispatch');




const dispatch_check_token = async (req, res, next) => {
  let dispatch = req.body.dispatchid
  const checkuser = await dispatchModel.findById(dispatch)
  if (!checkuser) {
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: "dispatch does not exist",
  
      error: "dispatch does not exist",
    });
  }
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
          token = req.headers.authorization.split(' ')[1] // gotten the token, now we will decode it

          const decoded = jwt.verify(token, riderJWT)
        const dispatchid = decoded.user
        if (dispatch != dispatchid) {
          console.log('id' , dispatchid , dispatch)
          return res.status(400).json({
            status_code: 400,
            status: false,
            message: "invalid token",
        
            error: "invalid token",
          });
         }

       next()
      } catch (error) {
        console.log(error)
          return res.status(400).json({
            status_code: 400,
            status: false,
            message: "invalid token",
        
            error: "invalid token",
          });
      }
    }
    if (!token) {
        return res.status(400).json({
            status_code: 400,
            status: false,
            message: "invalid token",
        
            error: "invalid token",
          });
    }
}
const dashxorder_token = async (req, res, next) => {
  let dashx = req.body.dashxid
  if (dashx != 'altinsmart_dashx') {
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: "not authorised",
      error: "not authorised",
    });
  }
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
          token = req.headers.authorization.split(' ')[1] // gotten the token, now we will decode it
          if (token !== 'iamtryingybest') {
            console.log('noyuei')
          return res.status(400).json({
            status_code: 400,
            status: false,
            message: "invalid token",
        
            error: "invalid token",
          });
         }

       next()
      } catch (error) {
        console.log(error)
          return res.status(400).json({
            status_code: 400,
            status: false,
            message: "invalid token",
        
            error: "invalid token",
          });
      }
    }
    if (!token) {
        return res.status(400).json({
            status_code: 400,
            status: false,
            message: "invalid token",
        
            error: "invalid token",
          });
    }
}



module.exports = {
    dispatch_check_token , dashxorder_token
}