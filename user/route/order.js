const { retrievepricingController } = require("../../admin/controller/pricing");
const {
  usercreateorderController,
  userretrievesingleorderController,
  userretrieveallorderController,
} = require("../controller/order");
const { user_check_token } = require("../core/authorization");
const { userValidation } = require("../core/validations/auth");
const {
  usercreateorderValidation,
  userretrievesingleorderValidation,
} = require("../core/validations/order");

const router = require("express").Router();

router.post(
  "/add/order",
  usercreateorderValidation,
  user_check_token,
  usercreateorderController
);
router.post(
  "/retrieve/single/order",
  userretrievesingleorderValidation,
  user_check_token,
  userretrievesingleorderController
);
router.post(
  "/retrieve/all/order",
  userValidation,
  user_check_token,
  userretrieveallorderController
);

router.post(
    "/retrieve/price",
    retrievepricingController
);

module.exports = router;
