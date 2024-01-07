const { userwithdrawwalletController, userfundwalletController, userwithdrawwallethistoryController, userretrievebankaccountController, userretrieveaccountbalanceController, usermakepaymentController } = require("../controller/wallet");
const { user_check_token } = require("../core/authorization");
const { userValidation } = require("../core/validations/auth");
const { userwithdrawwalletValidation, userwallethistoryValidation, userfundwalletValidation } = require("../core/validations/wallet");



const router = require("express").Router();

// router.post(
//   "/withdraw/wallet",
//   userwithdrawwalletValidation,
//   user_check_token,
//   userwithdrawwalletController
// );
router.post(
  "/dashx/fund",
  userfundwalletController
);
router.post(
  "/fund/wallet",
  userfundwalletValidation,
  user_check_token,
  usermakepaymentController
);

router.post(
  "/retrieve/wallet/history",
  userwallethistoryValidation,
  user_check_token,
  userwithdrawwallethistoryController
);


router.post(
  "/retrieve/balance",
  userValidation,
  user_check_token,
  userretrieveaccountbalanceController
);

module.exports = router