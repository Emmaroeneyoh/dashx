const jwt = require('jsonwebtoken');
const { adminJWT } = require('../../helper/utils');
const { adminModel } = require('./db/admin');



const admin_check_token = async (req, res, next) => {
    let user = req.body.adminid
  const checkuser = await adminModel.findById(user)
  if (!checkuser) {
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: "user does not exist",
  
      error: "user does not exist",
    });
  }
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
          token = req.headers.authorization.split(' ')[1] // gotten the token, now we will decode it

          const decoded = jwt.verify(token, adminJWT)
        const userid = decoded.user
        if (user != userid) {
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



// Middleware to check if the admin has the required roles for a route
const checkAdminRoles =  (requiredRoles) => {
  return  async (req, res, next) => {
    // Assuming you have an admin object attached to the request
      const admin = req.body.adminid;
      const checkrole = await adminModel.findById(admin)
      const adminrole = checkrole.roles

    // Check if the admin has any of the required roles
    const hasRequiredRole = requiredRoles.some((role) =>
    adminrole.some((adminRole) => adminRole.role === role)
    );

    if (hasRequiredRole) {
      // Admin has at least one of the required roles, allow access
      next();
    } else {
      // Admin does not have any of the required roles, deny access
      return res.status(403).json({
        status_code: 403,
        status: false,
        message: "access denied",
      });
    }
  };
};

// Example admin roles
const adminRoles = [
  { role: 'support' },
  { role: 'hr' },
];



module.exports = {
    admin_check_token , checkAdminRoles
}