


const monnifyKey = 'MK_TEST_164RU1XR63';
const secretKey = 'GX0YMMY4M1WD9XHJHSAGUG49Y8GRA1JV';
const monnifyBaseUrl = 'https://sandbox.monnify.com';
const axios = require('axios')




async function createMonnifyVirtualAccount(username) {
    // Step 1: Generate Access Token by Logging In
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

    // Step 2: Create Virtual Account using the Access Token
    const createAccountEndpoint = `${monnifyBaseUrl}/api/v1/bank-transfer/reserved-accounts`;
    const createAccountPayload = {
        accountReference: 'piru',
        accountName: `dashx_${username}`,
        currencyCode: 'NGN',
        contractCode: '4996347007', // Add your specific contract code
    customerEmail: 'emmaroeneyoh@gmail.com', // Add customer's email
    customerName: 'Customer Name', // Add customer's name
    phoneNumber: '09022201524', // Add customer's phone number
    incomeBracket: '0 - 100,000', // Add income bracket
    nextOfKin: {
        name: 'Next of Kin Name',
        phoneNumber: 'Next of Kin Phone Number',
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

const run = async () => {
    try {
        const virtualAccountResponse = await createMonnifyVirtualAccount('emma');
        console.log('Response:', virtualAccountResponse);
    } catch (error) {
        // Handle errors here
        console.error('Error creating virtual account:', error.response.data);
    }
};

run();
// async function createtoken() {
//     const apiKey = Buffer.from(`${monnifyKey}:${secretKey}`).toString('base64');
//     const endpoint = `${monnifyBaseUrl}/api/v1/auth/login`;
//     const payload = {
//         username: 'emmaroeneyoh@gmail.com',
//         password: 'Hybrid68van///',
//     };
//     const headers = {
//         'Authorization': `Basic ${apiKey}`,
//         'Content-Type': 'application/json',
//     };
//     const response = await axios.post(endpoint, payload, { headers });
//     const accesstoken =  response.data.responseBody.accessToken
   
//     try {
//         // const response = await axios.post(endpoint, payload, { headers });
//         // return response.data.responseBody.accessToken;
//     } catch (error) {
//         console.error('Error creating virtual account:', error.response.data);
//         throw error;
//     }
// }

// const run = async () => {
//     try {
//         const virtualAccountResponse = await createtoken();
//         console.log('Response:', virtualAccountResponse);
//     } catch (error) {
//         // Handle errors here
//     }
// };

// run();





//   // const endpoint = `${monnifyBaseUrl}/bank-transfer/reserved-accounts`;
//     // const payload = {
//     //     accountReference: username,
//     //     accountName: `dashx-${username}`,
//     //     currencyCode: 'NGN',
//     // };