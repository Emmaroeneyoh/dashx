const { route } = require("../../dispatch/route/order");
const {
  admincreateadminController,
  adminaddroleController,
  adminremoveroleController,
} = require("../controller/hr");
const { admincreateroleController, adminupdateroleController, adminretrieveroleController } = require("../controller/role");
const { admin_check_token, checkAdminRoles } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const {
  admincreateadminValidation,
  adminrolemgnValidation,
  admincreateroleValidation,
  adminupdateroleValidation,
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

//for mgnin role
router.post(
    "/create/role",
      admincreateroleValidation,
      checkAdminRoles(['superadmin']),
    admin_check_token,
    admincreateroleController
  );
router.post(
    "/update/role",
      adminupdateroleValidation,
      checkAdminRoles(['superadmin']),
    admin_check_token,
    adminupdateroleController
  );
router.post(
    "/retrieve/role",
      adminValidation,
      checkAdminRoles(['superadmin']),
    admin_check_token,
    adminretrieveroleController
  );
// router.post("/create/subadmin", admincreateadminValidation, admincreateadminController);

module.exports = router;
