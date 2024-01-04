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
const monnifyBaseUrl = 'https://sandbox.monnify.com';
const monnifyHeaders = {
    Authorization: `Bearer ${monnifyKey}`,
    'Content-Type': 'application/json',
};
const userfulteraccount = async (userid) => {
    try {
        const user = await userModel.findById(userid)
        const name = user.name
        const email = user.email
        const endpoint = `${monnifyBaseUrl}/bank-transfer/reserved-accounts`;
        const payload = {
            accountReference: name,
            accountName: `dashx_${name}`,
            currencyCode: 'NGN',
        };
    
        const virtualaccount =  axios.post(endpoint, payload, { headers: monnifyHeaders });
        // await userModel.findByIdAndUpdate(userid, {
        //     $set: {
        //         flutterwaveid: flutterwaveCustomerId,
        //     },
        // });
        const wallet = userWalletModel.findOne({ userid })
        const walletid = wallet._id
     // Generate a virtual account with Flutterwave
     const virtualAccountResponse = await flw.VirtualAccount.create({
        email,
        tx_ref: name,
        tx_email: email,
        amount: 0, // Set the initial amount
        currency: 'NGN',
        redirect_url: 'your_redirect_url',
        order_id: walletid,
        customer: flutterwaveCustomerId,
        // Add other required parameters
    });
   
        const virtualAccountNumber = virtualAccountResponse.data.account_number;
        //update the wellet
        await userWalletModel.findByIdAndUpdate(walletid, {
            $set: {
                account_number  : virtualAccountNumber,
            },
        });

        return 'success'
    } catch (error) {
        console.log('error' , error)
    }
}

module.exports = {
    userfulteraccount
}