const { adminupdatesubadminprofileController, adminupdateprofileController, adminupdatepasswordController } = require("../controller/admin");
const { admin_check_token, checkAdminRoles } = require("../core/authorization");
const { adminupdatesubadminprofilValidation, adminupdateprofilValidation, adminupdatepasswordValidation } = require("../core/validation/admin");

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

module.exports = router;
