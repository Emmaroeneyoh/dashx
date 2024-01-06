const { dispatchwithdrawwallethistoryController, dispatchmakepaymentController } = require("../controller/wallet");
const { dispatch_check_token } = require("../core/authorization");
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

module.exports = router