const { dashxcreateorderController, dispatchacceptorderController, dispatchlistorderController, dispatchaddordereventController, dispatchpickuporderController, dispatchdeliveredorderController, dispatchstartdispatchController } = require("../controller/order");
const { dashxorder_token, dispatch_check_token } = require("../core/authorization");
const { dashxcreateorderValidation, dispatchacceptorderValidation, dispatchaddordereventValidation, dispatchpickuporderValidation, dispatchdeliverorderValidation, dispatchstartorderValidation, dispatchlistorderValidation } = require("../core/validation/order");
const { dispatchValidation } = require("../core/validation/profile");


const router = require("express").Router();

router.post(
  "/create/dashx/order",
    dashxcreateorderValidation,
    dashxorder_token,
     dashxcreateorderController
);

router.post(
  "/accept/order",
  dispatchacceptorderValidation,
  dispatch_check_token,
  dispatchacceptorderController
);
router.post(
  "/list/order",
  dispatchlistorderValidation,
  dispatch_check_token,
  dispatchlistorderController
);
router.post(
  "/add/order/event",
  dispatchaddordereventValidation,
  dispatch_check_token,
  dispatchaddordereventController
);
router.post(
  "/pickup/order",
  dispatchpickuporderValidation,
  dispatch_check_token,
  dispatchpickuporderController
);
router.post(
  "/delivered/order",
  dispatchdeliverorderValidation,
  dispatch_check_token,
  dispatchdeliveredorderController
);
router.post(
  "/start/dispatch",
  dispatchstartorderValidation,
  dispatch_check_token,
  dispatchstartdispatchController
);



module.exports = router