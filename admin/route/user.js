const { model } = require("mongoose");
const { adminretrievesingleuserController, adminblockuserController, adminunblockuserController, adminretrievealluserController } = require("../controller/customer");
const { adminValidation } = require("../core/validation/auth");
const { adminmgnuserValidation } = require("../core/validation/user");


const router = require("express").Router();

router.post(
    "/retrieve/all/user",
    checkAdminRoles(['superadmin']) ,
  adminValidation,
  adminretrievealluserController
);
router.post(
    "/retrieve/single/user",
    checkAdminRoles(['superadmin']) ,
  adminmgnuserValidation,
  adminretrievesingleuserController
);
router.post(
    "/block/user",
    checkAdminRoles(['superadmin']) ,
  adminmgnuserValidation,
  adminblockuserController
);
router.post(
    "/unblock/user",
    checkAdminRoles(['superadmin']) ,
  adminmgnuserValidation,
  adminunblockuserController
);

module.exports = router