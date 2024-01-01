const { dispatchModel } = require("../core/db/dispatch");
const { dispatch_emailModel } = require("../core/db/dispatch_email");
const { dispatchWalletModel } = require("../core/db/wallet");
const { create_dispatch_token } = require("../core/utils");


const dispatchSignupModel = async (data, res) => {
  try {
    const {
        dispatchEmail,
        Harshpassword,
        phone, name , code
     
    } = data;
    const form = await new dispatchModel ({
        email:dispatchEmail,
       password : Harshpassword,
        phone, name
    });
   
      const userDetails = await form.save()
      //update the user code so you can verify him
      const updatecode = await dispatchModel.findByIdAndUpdate(userDetails._id, {
        $set: {
          'auth.auth_code': code,
        },
      });


    return 'please check email for code';
  } catch (error) {
    console.log('error' , error);
    return error.message;
   
  }
};
const dispatchsendconfirmemailModel = async (data, res) => {
  try {
    const {
     email , code
     
    } = data;
    console.log('posi')
    const checkemail = await dispatch_emailModel.findOne({ email })
    if (checkemail) {
      const updatecode = await dispatch_emailModel.findOneAndUpdate({email}, {
        $set: {
          code
        },
      });

      return 'success'
    }
    const form = await new dispatch_emailModel ({
       email , code
    });
   
    const userDetails = await form.save()
   
    return 'success'
  } catch (error) {
    console.log('error' , error);
    return error.message;
   
  }
};



const dispatchLoginModel = async (data,res) => {
  try {
    const { dispatchEmail, } = data
     const userDetails = await dispatchModel.findOne({ email:dispatchEmail});
    const token = create_dispatch_token(userDetails._id)
    const dispatchid = userDetails._id
    const dispatchwallet = await dispatchWalletModel.findOne({dispatchid})
     const userData = {
         id: userDetails._id,
         name: userDetails.name,
         email: userDetails.email,
         token, dispatchwallet
      }
   
     return userData
  } catch (error) {
      return error.message
  }
     
 }
module.exports = {
    dispatchSignupModel ,  dispatchLoginModel , dispatchsendconfirmemailModel
}