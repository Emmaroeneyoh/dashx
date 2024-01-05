const { adminretrievealldriverController, adminretrievesingledriverController, adminblockdriverController, adminunblockdriverController, adminretrieveunpproveddriverController, adminapprovedriverController, adminretrieveblockdriverController, adminretrieveblockuserController } = require("../controller/driver");
const { checkAdminRoles } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { adminmgndispatchValidation } = require("../core/validation/user");



const router = require("express").Router();

router.post(
    "/retrieve/all/dispatch",
    checkAdminRoles(['superadmin']) ,
  adminValidation,
  adminretrievealldriverController
);
router.post(
    "/retrieve/unapproved/dispatch",
    checkAdminRoles(['superadmin']) ,
  adminValidation,
  adminretrieveunpproveddriverController
);
router.post(
    "/retrieve/single/dispatch",
    checkAdminRoles(['superadmin']) ,
  adminmgndispatchValidation,
  adminretrievesingledriverController
);
router.post(
    "/block/dispatch",
    checkAdminRoles(['superadmin']) ,
    adminmgndispatchValidation, 
  adminblockdriverController
);
router.post(
    "/unblock/dispatch",
    checkAdminRoles(['superadmin']) ,
    adminmgndispatchValidation,
  adminunblockdriverController
);
router.post(
    "/approve/dispatch",
    checkAdminRoles(['superadmin']) ,
    adminmgndispatchValidation,
    adminapprovedriverController
);
router.post(
    "/retrieve/block/drivers",
    checkAdminRoles(['superadmin']) ,
    adminValidation,
    adminretrieveblockdriverController
);


module.exports = router