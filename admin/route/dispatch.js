const { adminretrievealldriverController, adminretrievesingledriverController, adminblockdriverController, adminunblockdriverController, adminretrieveunpproveddriverController, adminapprovedriverController, adminretrieveblockdriverController, adminretrieveblockuserController, adminrejectdispatchrequestController } = require("../controller/driver");
const { checkAdminRoles } = require("../core/authorization");
const { adminrejectdispatchrequestValidation } = require("../core/validation/admin");
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
    "/approve/dispatch/request",
    checkAdminRoles(['superadmin']) ,
    adminmgndispatchValidation,
    adminapprovedriverController
);
router.post(
    "/reject/dispatch/request",
    checkAdminRoles(['superadmin']) ,
    adminrejectdispatchrequestValidation ,
    adminrejectdispatchrequestController
);
router.post(
    "/retrieve/block/dispatch",
    checkAdminRoles(['superadmin']) ,
    adminValidation,
    adminretrieveblockdriverController
);


module.exports = router