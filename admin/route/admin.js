const { adminupdatesubadminprofileController, adminupdateprofileController, adminupdatepasswordController } = require("../controller/admin");
const { admindashbaordController } = require("../controller/dashboard");
const { admin_check_token, checkAdminRoles } = require("../core/authorization");
const { adminupdatesubadminprofilValidation, adminupdateprofilValidation, adminupdatepasswordValidation } = require("../core/validation/admin");
const { adminValidation } = require("../core/validation/auth");

const router = require("express").Router();

router.post(
    "/update/subadmin",
    adminupdatesubadminprofilValidation,
    checkAdminRoles(['superadmin']),
  admin_check_token,
  adminupdatesubadminprofileController
);
router.post(
    "/update/admin",
    adminupdateprofilValidation,
  admin_check_token,
  adminupdateprofileController
);
router.post(
    "/update/password",
    adminupdatepasswordValidation,
  admin_check_token,
  adminupdatepasswordController
);
router.post(
    "/dashboard",
    adminValidation,
  admin_check_token,
  admindashbaordController
);

module.exports = router;
