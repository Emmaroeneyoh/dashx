const { userwithdrawwalletController, userfundwalletController, userwithdrawwallethistoryController } = require("../controller/wallet");
const { user_check_token } = require("../core/authorization");
const { userwithdrawwalletValidation, userwallethistoryValidation } = require("../core/validations/wallet");



const router = require("express").Router();

router.post(
  "/withdraw/wallet",
  userwithdrawwalletValidation,
  user_check_token,
  userwithdrawwalletController
);
router.post(
  "/fund/wallet",
  userwithdrawwalletValidation,
  user_check_token,
  userfundwalletController
);

router.post(
  "/retrieve/wallet/history",
  userwallethistoryValidation,
  user_check_token,
  userwithdrawwallethistoryController
);

module.exports = router