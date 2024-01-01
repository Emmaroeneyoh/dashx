const {
  dispatchsendconfirmemailcontroller,
  dispatchconfirmemailcontroller,
  dispatchSignupController,
  dispatchLoginController,
  dispatchNewPasswordLink,
  dispatchresetPassword,
} = require("../controller/auth");
const {
  riderforgotpasswordValidation,
  ridercheckemailValidation,
  ridersignupValidation,
  riderLoginValidation,
  riderResetpasswordValidation,
} = require("../core/validation/auth");

const router = require("express").Router();


router.post(
  "/confirm/email",
  ridercheckemailValidation,
  dispatchconfirmemailcontroller
);
router.post("/signup", ridersignupValidation, dispatchSignupController);
router.post("/login", riderLoginValidation, dispatchLoginController);
router.post(
    "/forgot/password",
    riderforgotpasswordValidation,
    dispatchNewPasswordLink
  );
router.post(
    "/reset/password",
    riderResetpasswordValidation,
    dispatchresetPassword
  );

module.exports = router;
