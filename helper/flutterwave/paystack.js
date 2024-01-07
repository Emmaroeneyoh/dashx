// const paystack = require('paystack')('sk_test_4477a7fefffd601f6123a865cf28097215cbd7bd');

// const cardDetails = {
//     email: 'customer@example.com',
//     disatchid:'my_dispatch',
//   amount: 100000,  // Amount in kobo (100000 kobo = ₦1000)
//   card: {
//     number: '4084084084084081',
//     cvc: '408',
//     expiry_month: '08',
//     expiry_year: '22',
//     },
//   extra: {
//     metadata: {
//       custom_field1: 'value1',
//       custom_field2: 'value2',
//       // Add any additional metadata fields as needed
//     },
//   },
 
// };

// paystack.transaction.initialize(cardDetails)
//   .then(response => {
//     console.log(response);

//     // You might want to redirect the user to the payment page
//     const accessCode = response.data.access_code;
//     const authorizationUrl = response.data.authorization_url;
//     console.log('Redirect URL:', authorizationUrl);

//     // Handle the redirection as needed in your application
//   })
//   .catch(error => {
//     console.error(error);
//     // Handle errors
//   });






const axios = require('axios');

const PAYSTACK_PUBLIC_KEY = 'sk_test_36b75d480aef24923e9344aea6b9f07941fb9adc';

const generateCheckoutURL = async (email , amount , usertype ,) => {
    try {
        const paystackamount = amount * 100
        const dashxamount = amount
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email, // Replace with the customer's email
        amount : paystackamount , // Replace with the amount to be paid in kobo (e.g., 5000 for ₦5000)
        metadata: {
          usertype , money : dashxamount 
          // Add any additional metadata fields as needed
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_PUBLIC_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const checkoutURL = response.data.data.authorization_url;
      console.log('Checkout URL:', checkoutURL);
      return checkoutURL
  } catch (error) {
        console.error('Error generating checkout URL:', error.response.data);
      return false
  
  }
};

module.exports = {
    generateCheckoutURL
}
