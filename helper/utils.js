const base_url = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const userjwt = process.env.userJWT;
const userpasswordjwt = process.env.userpasswordjwt;
const riderJWT = process.env.riderJWT;
const riderpasswordjwt = process.env.riderpasswordjwt;
const adminJWT = process.env.adminJWT;
const adminpasswordjwt = process.env.adminpasswordjwt;
const appPassword = process.env.appPassword;
const cardsecret = process.env.cardsecret;
const monnifyKey = process.env.monnifyKey;
const secretKey = process.env.secretKey;
const monnifyBaseUrl = process.env.monnifyBaseUrl;
const contractCode = process.env.contractCode;


module.exports = {
  base_url, contractCode , monnifyKey  , secretKey , monnifyBaseUrl , contractCode , 
  PORT,
  userjwt,
  userpasswordjwt,
  riderJWT,
  riderpasswordjwt,
  adminJWT , adminpasswordjwt ,
  appPassword,cardsecret
};
