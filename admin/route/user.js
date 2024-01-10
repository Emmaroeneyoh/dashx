const { model } = require("mongoose");
const { adminretrievesingleuserController, adminblockuserController, adminunblockuserController, adminretrievealluserController, adminuserchatController, adminuserchathistoryController } = require("../controller/customer");
const { adminretrieveblockuserController, adminretrieveactivetripController, adminretrievetripController } = require("../controller/driver");
const { checkAdminRoles } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { adminmgnuserValidation, adminretrievetripValidation } = require("../core/validation/user");


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
    "/user/chat",
    checkAdminRoles(['superadmin']) ,
  adminmgnuserValidation,
  adminuserchatController
);
router.post(
    "/user/chat/history",
    checkAdminRoles(['superadmin']) ,
  adminValidation,
  adminuserchathistoryController
);
router.post(
    "/unblock/user",
    checkAdminRoles(['superadmin']) ,
  adminmgnuserValidation,
  adminunblockuserController
);
router.post(
    "/retrieve/block/users",
    checkAdminRoles(['superadmin']) ,
    adminValidation,
    adminretrieveblockuserController
);
router.post(
    "/retrieve/trip",
    checkAdminRoles(['superadmin']) ,
    adminretrieveactivetripController
);
router.post(
    "/retrieve/booking",
    checkAdminRoles(['superadmin']) ,
    adminretrievetripController
);

module.exports = router