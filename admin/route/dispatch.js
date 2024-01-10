const { adminretrievealldriverController, adminretrievesingledriverController, adminblockdriverController, adminunblockdriverController, adminretrieveunpproveddriverController, adminapprovedriverController, adminretrieveblockdriverController, adminretrieveblockuserController, adminrejectdispatchrequestController, adminretrieveallbussiessController, adminretrievesinglebussinessController, adminretrievebussinessdriverController, adminretrievebussinessorderController, adminchatdispatchrController, admindriverchathistoryController } = require("../controller/driver");
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
    "/dispatch/chat",
    checkAdminRoles(['superadmin']) ,
    adminmgndispatchValidation, 
    adminchatdispatchrController
);
router.post(
    "/dispatch/chat/history",
    checkAdminRoles(['superadmin']) ,
    adminValidation, 
    admindriverchathistoryController
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


//bussiness
router.post(
  "/retrieve/all/bussiness",
  checkAdminRoles(['superadmin']) ,
adminValidation,
adminretrieveallbussiessController
);
router.post(
  "/retrieve/single/bussiness",
  checkAdminRoles(['superadmin']) ,
  adminmgndispatchValidation,
adminretrievesinglebussinessController
);
router.post(
  "/retrieve/bussiness/driver",
  checkAdminRoles(['superadmin']) ,
  adminmgndispatchValidation,
  adminretrievebussinessdriverController
);
router.post(
  "/retrieve/bussiness/order",
  checkAdminRoles(['superadmin']) ,
  adminmgndispatchValidation,
  adminretrievebussinessorderController
);


module.exports = router