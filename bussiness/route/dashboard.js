const { dispatch_check_token } = require("../../dispatch/core/authorization");
const {
  dispatchValidation,
} = require("../../dispatch/core/validation/profile");
const {
  bussinessdashboardController,
  bussinessretrieveallorderController,
  bussinessretrievesingleorderController,
  bussinessretrievefleetdetailController,
  bussinessretrievefleetordersController,
  bussinessadddispatchController,
  bussinessretrievefleetrController,
} = require("../controller/dashboard");
const { bussinessupdatdispatchController, bussinessblockdispatchController, bussinessunblockdispatchController } = require("../controller/monitor");
const {
  bussinessretrievesingleorderValidation, bussinessretrievesinglefleetValidation, bussinessadddispatchValidation, bussinessupdatedispatchValidation,
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

router.post(
  "/retrieve/all/fleet",
  dispatchValidation,
  dispatch_check_token,
  bussinessretrievefleetrController
);
router.post(
  "/retrieve/all/order",
  dispatchValidation,
  dispatch_check_token,
  bussinessretrieveallorderController
);

router.post(
  "/retrieve/single/fleet",
  bussinessretrievesinglefleetValidation,
  dispatch_check_token,
  bussinessretrievefleetdetailController 
);
router.post(
  "/block/fleet",
  bussinessretrievesinglefleetValidation,
  dispatch_check_token,
  bussinessblockdispatchController
);
router.post(
  "/unblock/fleet",
  bussinessretrievesinglefleetValidation,
  dispatch_check_token,
 bussinessunblockdispatchController
);
router.post(
  "/retrieve/fleet/order",
  bussinessretrievesinglefleetValidation,
  dispatch_check_token,
  bussinessretrievefleetordersController
);
router.post(
  "/add/dispatch",
  bussinessadddispatchValidation,
  dispatch_check_token,
  bussinessadddispatchController
);
router.post(
  "/update/dispatch",
  bussinessupdatedispatchValidation,
  dispatch_check_token,
  bussinessupdatdispatchController
);


module.exports = router;
