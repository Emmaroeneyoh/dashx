const { route } = require("../../dispatch/route/order");
const {
  admincreateadminController,
  adminaddroleController,
  adminremoveroleController,
  adminretrieveadminsController,
  adminblocksubadminController,
  adminunblocksubadminController,
} = require("../controller/hr");
const { adminsetpricingController, adminupdatepricingController, retrievepricingController } = require("../controller/pricing");
const { admincreateroleController, adminupdateroleController, adminretrieveroleController } = require("../controller/role");
const { admin_check_token, checkAdminRoles } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const {
  admincreateadminValidation,
  adminrolemgnValidation,
  admincreateroleValidation,
  adminupdateroleValidation,
  adminblockValidation,
} = require("../core/validation/hr");
const { adminpriceValidation } = require("../core/validation/pricing");

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
router.post(
    "/retrieve/admins",
      adminValidation,
      checkAdminRoles(['superadmin']),
    admin_check_token,
    adminretrieveadminsController
  );
// router.post("/create/subadmin", admincreateadminValidation, admincreateadminController);

//set price
router.post(
    "/set/price",
    adminpriceValidation ,
      checkAdminRoles(['superadmin']),
    admin_check_token,
    adminsetpricingController
  );
router.post(
    "/update/price",
    adminpriceValidation ,
      checkAdminRoles(['superadmin']),
    admin_check_token,
    adminupdatepricingController
  );
router.post(
    "/retrieve/price",
    retrievepricingController
);
  
router.post(
    "/block/subadmin",
    adminblockValidation,
    admin_check_token,
    adminblocksubadminController
  );
router.post(
    "/unblock/subadmin",
    adminblockValidation,
    admin_check_token,
    adminunblocksubadminController
  );
// rou
module.exports = router;
