const {
  userupdateprofileController,
  userupdatepasswordController,
  userretrieveprofileController,
  userretrievechatController,
} = require("../controller/profile");
const { user_check_token } = require("../core/authorization");
const { userValidation } = require("../core/validations/auth");
const {
  userupdateprofileValidation,
  userupdatepasswordValidation,
} = require("../core/validations/profile");

const router = require("express").Router();

router.post(
  "/update/profile",
  userupdateprofileValidation,
  user_check_token,
  userupdateprofileController
);
router.post(
  "/update/password",
  userupdatepasswordValidation,
  user_check_token,
  userupdatepasswordController
);
router.post(
  "/profile",
  userValidation,
  user_check_token,
  userretrieveprofileController
);
router.post(
  "/chat/support",
  userValidation,
  user_check_token,
  userretrievechatController
);
router.post(
  "/paystack",
  (req,res) => {
    console.log('body', req.body)
    const datas = req.body.data
    const status = datas.status
    const transid = datas.id
    const amount = datas.amount
    const reference = datas.reference
    const user = req.body.customer
    const email = user.email
    res.send('hello')
 }
);

module.exports = router;
