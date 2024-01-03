
const monnifyKey = 'MK_TEST_164RU1XR63';
const secretKey = 'GX0YMMY4M1WD9XHJHSAGUG49Y8GRA1JV';
const monnifyBaseUrl = 'https://sandbox.monnify.com';
const axios = require('axios');
const { userModel } = require('../../user/core/db/user');
const { userWalletModel } = require('../../user/core/db/wallet');
const { generateRandomString } = require('../../user/core/utils');


const generateaccesstoken = async () => {
    const apiKey = Buffer.from(`${monnifyKey}:${secretKey}`).toString('base64');
    const loginEndpoint = `${monnifyBaseUrl}/api/v1/auth/login`;
    const loginPayload = {
        username: 'emmaroeneyoh@gmail.com',
        password: 'Hybrid68van///',
    };
    const loginHeaders = {
        'Authorization': `Basic ${apiKey}`,
        'Content-Type': 'application/json',
    };

    const loginResponse = await axios.post(loginEndpoint, loginPayload, { headers: loginHeaders });
    const accessToken = loginResponse.data.responseBody.accessToken;
    return accessToken
}

async function createMonnifyVirtualAccount(userid) {
    const accessToken = await generateaccesstoken()
    //find the user
    const user = await userModel.findById(userid)
    const name = user.name
    const email = user.email
    // Step 1: Generate Access Token by Logging In

    const code = generateRandomString(10);
    // Step 2: Create Virtual Account using the Access Token
    const createAccountEndpoint = `${monnifyBaseUrl}/api/v1/bank-transfer/reserved-accounts`;
    const createAccountPayload = {
        accountReference: code,
        accountName: name,
        currencyCode: 'NGN',
        contractCode: '4996347007', // Add your specific contract code
    customerEmail: email, // Add customer's email
    customerName: name, // Add customer's name
    phoneNumber: user.phone, // Add customer's phone number
    incomeBracket: '0 - 100,000', // Add income bracket
    nextOfKin: {
        name: 'umana okon',
        phoneNumber: user.phone,
    },
    metaData: {
        customField1: 'Custom Value 1',
        customField2: 'Custom Value 2',
        // Add any other custom fields as needed
    },
    };
    const createAccountHeaders = {
        'Authorization': `Bearer ${accessToken}`,  // Use 'Bearer' for access token
        'Content-Type': 'application/json',
    };

    const createAccountResponse = await axios.post(createAccountEndpoint, createAccountPayload, { headers: createAccountHeaders });
    const account = createAccountResponse.data;

    console.log('Account:', account);
    return account;
}


const createvirtualaccount = async (user) => {
    try {
        const virtualAccountResponse = await createMonnifyVirtualAccount(user);
        //update wallet
        
    const form = await userWalletModel.findOneAndUpdate({userid :user}, {
        $set: {
            account_number: virtualAccountResponse.responseBody.accountNumber
        },
      });
        console.log('Response:', virtualAccountResponse.responseBody.accountNumber);
    } catch (error) {
        // Handle errors here
        console.error('Error creating virtual account:', error.response.data);
        return false
        
    }
};



module.exports = {
    createvirtualaccount , generateaccesstoken
}