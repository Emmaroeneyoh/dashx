const flutterwave = require('flutterwave-node');
const { userModel } = require('../../user/core/db/user');
const { userWalletModel } = require('../../user/core/db/wallet');
const axios = require('axios')
// const flutterwaveKey = 'FLWSECK_TEST-bef41323b3182d29cc0f95ec3a5b3aa6-X'
// const flw = new flutterwave(flutterwaveKey);

// const userfulteraccount = async (userid) => {
//     try {
//         const user = await userModel.findById(userid)
//         const name = user.name
//         const email = user.email
//           // Create a Flutterwave customer
//           const customerResponse = await flw.Customer.create({
//             email,
//             name
//         });

//         const flutterwaveCustomerId = customerResponse.data.id;
//         await userModel.findByIdAndUpdate(userid, {
//             $set: {
//                 flutterwaveid: flutterwaveCustomerId,
//             },
//         });
//         const wallet = userWalletModel.findOne({ userid })
//         const walletid = wallet._id
//      // Generate a virtual account with Flutterwave
//      const virtualAccountResponse = await flw.VirtualAccount.create({
//         email,
//         tx_ref: name,
//         tx_email: email,
//         amount: 0, // Set the initial amount
//         currency: 'NGN',
//         redirect_url: 'your_redirect_url',
//         order_id: walletid,
//         customer: flutterwaveCustomerId,
//         // Add other required parameters
//     });
   
//         const virtualAccountNumber = virtualAccountResponse.data.account_number;
//         //update the wellet
//         await userWalletModel.findByIdAndUpdate(walletid, {
//             $set: {
//                 account_number  : virtualAccountNumber,
//             },
//         });

//         return 'success'
//     } catch (error) {
//         console.log('error' , error)
//     }
// }
// Configure Monnify with your API key
const monnifyKey = 'MK_TEST_164RU1XR63';
const secretKey = 'GX0YMMY4M1WD9XHJHSAGUG49Y8GRA1JV';
const monnifyBaseUrl = 'https://sandbox.monnify.com';


async function createMonnifyVirtualAccount(username) {


    //screen to generate token 
    const apiKey = Buffer.from(`${monnifyKey}:${secretKey}`).toString('base64');
    const endpoint = `${monnifyBaseUrl}/api/v1/auth/login`;
    const payload = {
        username: 'emmaroeneyoh@gmail.com',
        password: 'Hybrid68van///',
    };
    const headers = {
        'Authorization': `Basic ${apiKey}`,
        'Content-Type': 'application/json',
    };
    const response = await axios.post(endpoint, payload, { headers });
    const accesstoken = response.data.responseBody.accessToken
    
    //create virtual account
    const creatacoounturl = `${monnifyBaseUrl}/bank-transfer/reserved-accounts`;
    const userpayload = {
        accountReference: username,
        accountName: `dashx-${username}`,
        currencyCode: 'NGN',
    };
    const acountheaders = {
        'Authorization': `Basic ${accesstoken}`,
        'Content-Type': 'application/json',
    };
    const accountresponse = await axios.post(creatacoounturl, userpayload , { headers :acountheaders });
    const account = accountresponse.data.responseBody
    return account
    // return axios.post(endpoint, payload, {  headers: {
    //     "Authorization": `Basic ${apiKey}`
    // } });
}
const userfulteraccount = async (userid) => {
    try {
        
        const user = await userModel.findById(userid)
        const name = user.name
        const email = user.email
        const virtualAccountResponse = await createMonnifyVirtualAccount(name);
        const wallet = userWalletModel.findOne({ userid })
        const walletid = wallet._id
        //update the wellet
        await userWalletModel.findByIdAndUpdate(walletid, {
            $set: {
                account_number  : virtualAccountResponse.data.accountNumber,
            },
        });

        return 'success'
    } catch (error) {
        console.log('error', error)
        return false
    }
}

module.exports = {
    userfulteraccount
}