const { appPassword, userpasswordjwt } = require("../../helper/utils");
const { handleError, generateRandomString, generateTrackingid, generateuserauthcode } = require("../core/utils");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { userSignupModel, userLoginModel } = require("../model/auth");
const { userModel } = require("../core/db/user");
const { userWalletModel } = require("../core/db/wallet");
const {
  userfulteraccount,
  createvirtualaccount,
} = require("../../helper/flutterwave/account");

const userSignupController = async (req, res, next) => {
  const {
    email,
    password,
    phone,
    name,
    address,
    latitude,
    longitude,
    city,
    state,
  } = req.body;
  const userEmail = email.toLowerCase();
  const code = await generateuserauthcode();
  try {
    const people = await userModel.findOne({ email: userEmail });
    if (people && people.auth.auth_verified) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "email already exist",
        data: [],
        error: "email already exist",
      });
    }
    //start of nodemailer email verification
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "emmaroeneyoh@gmail.com",

        pass: appPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: "emmaroeneyoh@gmail.com",
      to: `${email}`,
      subject: "Nodemailer Project",
      text: `${code}`,
      // html: data,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "email email account not verified",
          data: [],
          error: "email email account not verified",
        });
      } else {
        console.log("succes :");
      }
    });
    if (people && !people.auth.auth_verified) {
      //update the user code so you can verify him
      await userModel.findByIdAndUpdate(people._id, {
        $set: {
          "auth.auth_code": code,
        },
      });
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "check your email",
      });
    }
    //end of verification email
    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
    const user = await userModel.findOne({ email: userEmail });
    if (user) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "email already exist",
        data: [],
        error: "email already exist",
      });
    }

    const data = {
      userEmail,
      Harshpassword,
      phone,
      name,
      code,
      address,
      latitude,
      longitude,
      state,
      city,
    };

    let trainee = await userSignupModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const userconfirmemailcontroller = async (req, res) => {
  const { code } = req.body;
  try {
    const checkcode = await userModel.findOne({ "auth.auth_code": code });

    if (!checkcode) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "wrong code ",
      });
    }
    const email = checkcode.email;
    if (checkcode.auth.auth_verified) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "email already verified",
      });
    }
    //update the email to true
    const updatecode = await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          "auth.auth_verified": true,
        },
      }
    );
    //     //create user wallet
    const wallet = await new userWalletModel({
      userid: checkcode._id,
    });
    const userwallet = await wallet.save();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "successss",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const userLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  const userEmail = email.toLowerCase();
  try {
    const userDetails = await userModel.findOne({
      email: userEmail,
    });
    if (!userDetails) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "user dont exist on our application",
        data: [],
        error: "user dont exist on our application",
      });
    }
    //check if the email is verified
    if (!userDetails.auth.auth_verified) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "user email is not veirified",
        data: [],
        error: "user email is not veirified",
      });
    }

    const checkPassword = await bcrypt.compare(password, userDetails.password);
    if (!checkPassword) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "incorrect password",
        data: [],
        error: "incorrect password",
      });
    }
    const data = {
      userEmail,
      password,
    };

    let trainee = await userLoginModel(data, res);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "login process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const userNewPasswordLink = async (req, res) => {
  const { email } = req.body;
  const useremail = email.toLowerCase();
  try {
    const client = await userModel.findOne({ email: useremail });

    if (!client) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "incorrect email",
        error: "incorrect email",
      });
    }
    //function to generate token
    const secret = userpasswordjwt;
    const payload = {
      email: useremail,
      id: client._id,
    };
    const riderid = client._id;
    const token = jwt.sign(payload, secret, { expiresIn: "50m" });
    const code = generateRandomString(5);
    //updating the user auth
    const form = await userModel.findByIdAndUpdate(riderid, {
      $set: {
        auth: { auth_token: token, auth_code: code, auth_verified: true },
      },
    });

    const link = `code ${code}`;

    //start of nodemailer
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "emmaroeneyoh@gmail.com",

        pass: appPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: "emmaroeneyoh@gmail.com",
      to: `${email}`,
      subject: "Nodemailer Project",
      text: `${link}`,
      // html: data,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    //end of nodemailer
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "mail sent through",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const userresetPassword = async (req, res) => {
  try {
    const { code, password } = req.body;
    console.log(code);
    const rider = await userModel.findOne({ "auth.auth_code": code });
    if (!rider) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "invalide code",
        error: "invalide code",
      });
    }
    const verifiedToken = jwt.verify(rider.auth.auth_token, userpasswordjwt);
    if (!verifiedToken) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "code expire , generate new code",
        error: "code expire , generate new code",
      });
    }

    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
    const id = rider._id;
    const updateclient = await userModel.findByIdAndUpdate(id, {
      $set: {
        password: Harshpassword,
      },
    });
    //   const datad = { notification: 'you have successfully updated your profile', traineeId }
    //   await notificationModel(datad)
    if (!updateclient) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "cant update password",
        error: "cant update password",
      });
    }
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user password updated",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status_code: 400,
      status: false,
      message: "token has expired",
      data: [],
      error: "token has expired",
    });
  }
};
module.exports = {
  userSignupController,
  userLoginController,
  userNewPasswordLink,
  userconfirmemailcontroller,
  userresetPassword,
};
