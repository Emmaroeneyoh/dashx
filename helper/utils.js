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


module.exports = {
  base_url,
  PORT,
  userjwt,
  userpasswordjwt,
  riderJWT,
  riderpasswordjwt,
  adminJWT , adminpasswordjwt ,
  appPassword,cardsecret
};
