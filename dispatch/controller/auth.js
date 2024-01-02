const { appPassword, riderpasswordjwt } = require("../../helper/utils");
const { dispatchModel } = require("../core/db/dispatch");
const { handleError, generateRandomString } = require("../core/utils");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const {  dispatchLoginModel, dispatchSignupModel } = require("../model/auth");
const { dispatchWalletModel } = require("../core/db/wallet");



const dispatchSignupController = async (req, res, next) => {
  const {  email, password, phone, name , personel_account } = req.body;
  const dispatchEmail = email.toLowerCase();
  const code = generateRandomString(5);
  try {
    const dispatch = await dispatchModel.findOne({ email: dispatchEmail });
    if (dispatch && dispatch.auth.auth_verified) {
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
            console.log('succes :' )
        }
      });
        //end of verification email
    if (dispatch && !dispatch.auth.auth_verified) {
          //update the user code so you can verify him
    await dispatchModel.findByIdAndUpdate(dispatch._id, {
        $set: {
          'auth.auth_code': code,
        },
      });
          return res.status(400).json({
            status_code: 400,
            status: false,
            message: "check your email",
          });
        }
    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
   
  
    const data = {
    dispatchEmail,
      Harshpassword,
      phone, name , code , personel_account
    };

    let trainee = await dispatchSignupModel(data, res);
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

const dispatchconfirmemailcontroller = async (req, res) => {
    const {  code } = req.body;
    try {
        const checkcode = await dispatchModel.findOne({ 'auth.auth_code': code });
        const email = checkcode.email
      if (!checkcode ) {
        return res.status(400).json({
          status_code: 400,
          status: true,
          message: "wrong code ",
        });
        }
        if (checkcode.auth.auth_verified) {
            return res.status(400).json({
                status_code: 400,
                status: true,
                message: "email already verified",
              });
        }
       //update the email to true
       const updatecode = await  dispatchModel.findOneAndUpdate({email}, {
        $set: {
           'auth.auth_verified': true
        },
       });
        //     //create user wallet
    const wallet =   await new dispatchWalletModel ({
      dispatchid : checkcode._id
      
    });
   const userwallet =   await wallet.save()
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
  

const dispatchLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  const dispatchEmail = email.toLowerCase();
  try {
    const userDetails = await dispatchModel.findOne({
      email: dispatchEmail,
    });
        //check if the email is verified
        if (!userDetails.auth.auth_verified) {
            return res.status(400).json({
                status_code: 400,
                status: false,
                message: "dispatch email is not veirified",
                error: "dispatch email is not veirified",
              });
    }
    const dispatchDetails = await dispatchModel.findOne({
      email: dispatchEmail,
    });
    if (!dispatchDetails) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "user dont exist on our application",
        data: [],
        error: "user dont exist on our application",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      dispatchDetails.password
    );
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
      dispatchEmail,
      password,
    };

    let trainee = await dispatchLoginModel(data, res);

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




const dispatchNewPasswordLink = async (req, res) => {
  const { email } = req.body;
  const useremail = email.toLowerCase();
  try {
    const client = await dispatchModel.findOne({ email: useremail });

    if (!client) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "incorrect email",
        error: "incorrect email",
      });
    }
    //function to generate token
    const secret = riderpasswordjwt;
    const payload = {
      email: useremail,
      id: client._id,
    };
    const riderid = client._id;
    const token = jwt.sign(payload, secret, { expiresIn: "50m" });
    const code = generateRandomString(5);
    //updating the user auth
    const form = await dispatchModel.findByIdAndUpdate(riderid, {
      $set: {
        auth: { auth_token: token, auth_code: code , auth_verified:true },
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

const dispatchresetPassword = async (req, res) => {
  try {
    const { code, password } = req.body;
    console.log(code);
    const rider = await dispatchModel.findOne({ "auth.auth_code": code });
    console.log("rider", rider);
    if (!rider) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "invalide code",
        error: "invalide code",
      });
    }
    const verifiedToken = jwt.verify(
      rider.auth.auth_token,
      riderpasswordjwt
    );
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
    const updateclient = await dispatchModel.findByIdAndUpdate(id, {
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
  dispatchSignupController,
  dispatchLoginController,
  dispatchNewPasswordLink,

  dispatchresetPassword,
 
  dispatchconfirmemailcontroller,
};
