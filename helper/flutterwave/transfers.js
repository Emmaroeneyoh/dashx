const { monnifyBaseUrl } = require("../utils");
const { generateaccesstoken } = require("./account");
const axios = require('axios');
const { generateRandomString } = require("../../user/core/utils");



const transfer = async (amount , narration , destinationBankCode ,destinationAccountNumber , sourceAccountNumber ) => {
    try {
        const code = generateRandomString(10);
        const token = await generateaccesstoken();
        const requestData = {
            amount : 200,
            reference : "referen00ce---1290034",
            narration : "911 Transaction",
            destinationBankCode : "057",
            destinationAccountNumber  : "2085886393",
            currency: "NGN",
            sourceAccountNumber :'9964840075'
        }
      const endpoint = `${monnifyBaseUrl}/api/v2/disbursements/single`;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      const response = await axios.post(endpoint, requestData , { headers });
  
      if (response.data && response.data.responseMessage === "success") {
        const banks = response.data.responseObject;
        console.log("Banks:", response.data);
        return response.data;
      } else {
        console.error("Failed to retrieve bank details:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error retrieving bank details:", error);
      return null;
    }
};
  
module.exports = {
    transfer
}