const { monnifyBaseUrl, monnifyKey } = require("../utils");
const { generateaccesstoken } = require("./account");
const axios = require("axios");

const getBankDetails = async () => {
  try {
    const token = await generateaccesstoken();
    const endpoint = `${monnifyBaseUrl}/api/v1/sdk/transactions/banks`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(endpoint, { headers });

    if (response.data && response.data.responseMessage === "success") {
      const banks = response.data.responseObject;
      console.log("Banks:", response.data.responseBody);
      return response.data.responseBody;
    } else {
      console.error("Failed to retrieve bank details:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving bank details:", error.message);
    return null;
  }
};
const retrievebalance = async (account) => {
  try {
    const token = await generateaccesstoken();
    const endpoint = `${monnifyBaseUrl}/api/v1/disbursements/wallet/balance?accountNumber=${account}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(endpoint, { headers });

    if (response.data && response.data.responseMessage === "success") {
      const banks = response.data.responseObject;
      console.log("Banks:", response.data.responseBody);
      return response.data.responseBody;
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
  getBankDetails,  retrievebalance
};
