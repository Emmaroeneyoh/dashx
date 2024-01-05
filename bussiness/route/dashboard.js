const { dispatch_check_token } = require("../../dispatch/core/authorization");
const {
  dispatchValidation,
} = require("../../dispatch/core/validation/profile");
const {
  bussinessdashboardController,
  bussinessretrieveallorderController,
  bussinessretrievesingleorderController,
} = require("../controller/dashboard");
const {
  bussinessretrievesingleorderValidation,
} = require("../core/validation/dashboard");

const router = require("express").Router();

router.post(
  "/dashboard",
  dispatchValidation,
  dispatch_check_token,
  bussinessdashboardController
);


//delivery / order

router.post(
    "/delivery/history",
    dispatchValidation,
    dispatch_check_token,
    bussinessretrieveallorderController
  );
  router.post(
    "/single/order",
    bussinessretrievesingleorderValidation,
    dispatch_check_token,
    bussinessretrievesingleorderController
);
  
//mgn of riders 


module.exports = router;
