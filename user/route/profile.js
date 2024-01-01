const {
  userupdateprofileController,
  userupdatepasswordController,
  userretrieveprofileController,
} = require("../controller/profile");
const { user_check_token } = require("../core/authorization");
const { userValidation } = require("../core/validations/auth");
const {
  userupdateprofileValidation,
  userupdatepasswordValidation,
} = require("../core/validations/profile");

const router = require("express").Router();

router.post(
  "/update/profile",
  userupdateprofileValidation,
  user_check_token,
  userupdateprofileController
);
router.post(
  "/update/password",
  userupdatepasswordValidation,
  user_check_token,
  userupdatepasswordController
);
router.post(
  "/profile",
  userValidation,
  user_check_token,
  userretrieveprofileController
);

module.exports = router;
