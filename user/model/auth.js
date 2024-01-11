const { userModel } = require("../core/db/user");
const { userWalletModel } = require("../core/db/wallet");
const { create_user_token } = require("../core/utils");



const userSignupModel = async (data, res) => {
  try {
    const {
        userEmail,
        Harshpassword,
        phone, name , code , address , latitude , longitude ,  state ,  city
     
    } = data;
    const form = await new userModel ({
        email:userEmail,
       password : Harshpassword,
        phone, name , address , latitude , longitude ,  state ,  city
    });
   
      const userDetails = await form.save()
      //update the user code so you can verify him
      const updatecode = await userModel.findByIdAndUpdate(userDetails._id, {
        $set: {
          'auth.auth_code': code,
        },
      });
//     //create user wallet
//     const wallet =   await new userWalletModel ({
//       userid : userDetails._id
      
//     });
//    const userwallet =   await wallet.save()
    // const token = create_user_token(userDetails._id);
    // const userData = {
    //   id: userDetails._id,
    //   email: userDetails.email,
    //   token, userwallet
    // };

    return 'please check email for code';
  } catch (error) {
    console.log('error' , error);
    return error.message;
   
  }
};


const userLoginModel = async (data,res) => {
  try {
    const { userEmail, } = data
     const userDetails = await userModel.findOne({ email:userEmail});
    const token = create_user_token(userDetails._id)
    const userid = userDetails._id
    const userwallet = await userWalletModel.findOne({userid})
     const userData = {
      token , userDetails , userwallet
      }
   
     return userData
  } catch (error) {
      return error.message
  }
     
 }
module.exports = {
    userSignupModel ,  userLoginModel 
}