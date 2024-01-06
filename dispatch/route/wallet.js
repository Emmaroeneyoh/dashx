const { dispatchwithdrawwallethistoryController, dispatchmakepaymentController, userretrieveaccountbalanceController } = require("../controller/wallet");
const { dispatch_check_token } = require("../core/authorization");
const { dispatchValidation } = require("../core/validation/profile");
const { dispatchwithdrawwalletValidation, dispatchwallethistoryValidation, dispatchfundwalletValidation } = require("../core/validation/wallet");


const router = require("express").Router();

// router.post(
//   "/withdraw/fund",
//   dispatchwithdrawwalletValidation,
//   dispatch_check_token,
//   dispatchwithdrawwalletController
// );
router.post(
  "/fund/history",
  dispatchwallethistoryValidation,
  dispatch_check_token,
  dispatchwithdrawwallethistoryController
);

router.post(
  "/fund/wallet",
  dispatchfundwalletValidation,
  dispatch_check_token,
  dispatchmakepaymentController
);
router.post(
  "/wallet/balance",
  dispatchValidation,
  dispatch_check_token,
  userretrieveaccountbalanceController
);

module.exports = router