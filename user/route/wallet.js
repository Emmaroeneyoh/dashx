const { userwithdrawwalletController, userfundwalletController, userwithdrawwallethistoryController, userretrievebankaccountController, userretrieveaccountbalanceController } = require("../controller/wallet");
const { user_check_token } = require("../core/authorization");
const { userValidation } = require("../core/validations/auth");
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

router.post(
  "/retrieve/bank",
  userValidation,
  user_check_token,
  userretrievebankaccountController
);
router.post(
  "/retrieve/balance",
  userValidation,
  user_check_token,
  userretrieveaccountbalanceController
);

module.exports = router