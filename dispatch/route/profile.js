const {
  dispatchupdatevehicleController,
  dispatchupdatephotoController,
  dispatchupdateprofileController,
  dispatchretrieveprofileController,
  dispatchupdatepasswordController,
  dispatchupdatestatusController,
} = require("../controller/profile");
const { dispatch_check_token } = require("../core/authorization");
const {
  dispatchupdatevehicleValidation,
  dispatchupdatephotoValidation,
  dispatchupdateprofileValidation,
  dispatchValidation,
  dispatchupdatepasswordValidation,
  dispatchupdatestatusValidation,
} = require("../core/validation/profile");

const router = require("express").Router();

router.post(
  "/update/vehicle",
  dispatchupdatevehicleValidation,
  dispatch_check_token,
  dispatchupdatevehicleController
);
router.post(
  "/update/photo",
  dispatchupdatephotoValidation,
  dispatch_check_token,
  dispatchupdatephotoController
);
router.post(
  "/update/profile",
  dispatchupdateprofileValidation,
  dispatch_check_token,
  dispatchupdateprofileController
);
router.post(
  "/update/password",
  dispatchupdatepasswordValidation,
  dispatch_check_token,
  dispatchupdatepasswordController
);
router.post(
  "/update/status",
  dispatchupdatestatusValidation,
  dispatch_check_token,
  dispatchupdatestatusController
);
router.post(
  "/profile",
  dispatchValidation,
  dispatch_check_token,
  dispatchretrieveprofileController
);

module.exports = router;
