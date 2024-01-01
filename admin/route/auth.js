const { adminLoginController, adminNewPasswordLink, adminresetPassword, adminprofileController } = require("../controller/auth");
const { admin_check_token } = require("../core/authorization");
const { adminLoginValidation, adminforgotpasswordValidation, adminResetpasswordValidation, adminValidation } = require("../core/validation/auth");

  
  const router = require("express").Router();
  
  router.post("/login", adminLoginValidation, adminLoginController);
  router.post(
    "/forgot/password",
    adminforgotpasswordValidation,
    adminNewPasswordLink
  );
  router.post(
    "/reset/password",
    adminResetpasswordValidation,
    adminresetPassword
  );
  router.post(
      "/profile",
      adminValidation,
      admin_check_token,
    adminprofileController
  );
  
  module.exports = router;
  