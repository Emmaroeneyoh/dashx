const {
  userSignupController,
  userLoginController,
  userNewPasswordLink,
  userresetPassword,
  userconfirmemailcontroller,
} = require("../controller/auth");
const {
  usersignupValidation,
  userLoginValidation,
  userforgotpasswordValidation,
  userResetpasswordValidation,
  userconfirmcodeValidation,
} = require("../core/validations/auth");

const router = require("express").Router();

router.post("/signup", usersignupValidation, userSignupController);
router.post("/confirmcode", userconfirmcodeValidation, userconfirmemailcontroller);
router.post("/login", userLoginValidation, userLoginController);
router.post(
  "/forgot/password",
  userforgotpasswordValidation,
  userNewPasswordLink
);
router.post("/reset/password", userResetpasswordValidation, userresetPassword);

module.exports = router;
