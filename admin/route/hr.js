const { route } = require("../../dispatch/route/order");
const {
  admincreateadminController,
  adminaddroleController,
  adminremoveroleController,
} = require("../controller/hr");
const { admin_check_token, checkAdminRoles } = require("../core/authorization");
const {
  admincreateadminValidation,
  adminrolemgnValidation,
} = require("../core/validation/hr");

const router = require("express").Router();

router.post(
    "/create/subadmin",
    checkAdminRoles(['superadmin']) ,
  admincreateadminValidation,
  admincreateadminController
);
router.post(
  "/add/role",
    adminrolemgnValidation,
    checkAdminRoles(['superadmin']),
  admin_check_token,
  adminaddroleController
);
router.post(
  "/remove/role",
    adminrolemgnValidation,
    checkAdminRoles(['superadmin']),
  admin_check_token,
  adminremoveroleController
);
// router.post("/create/subadmin", admincreateadminValidation, admincreateadminController);

module.exports = router;
