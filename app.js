const express = require("express");
//using the env
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const cors = require("cors");
const app = express();
//socket connection 
const http = require("http").Server(app);
const io = require("socket.io")(http,  {
    pingInterval: 15000, // Ping every 15 seconds
    pingTimeout: 30000,  // Wait 30 seconds for the client to respond to pings
  });
const { PORT } = require("./helper/utils")

//for user


// for dispatch
const dispatchauth = require('./dispatch/route/auth'); 
const dispatchprofile = require('./dispatch/route/profile'); 
const dispatchorder = require('./dispatch/route/order'); 

// for user +
const userauth = require('./user/route/auth'); 
const userprofile = require('./user/route/profile'); 
const userorder = require('./user/route/order'); 
const userwallet = require('./user/route/wallet'); 
const { coonectdb } = require("./helper/conectdb");

// for admin 
const adminauth = require('./admin/route/auth');
const adminadmin = require('./admin/route/admin');
const adminhr = require('./admin/route/hr');

//connecting the database
coonectdb();

app.use(cors());
//applying our middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = '/user'
const admin = '/admin'
const dispatch = '/dispatch'
//for user
app.use(user , userauth)
app.use(user , userprofile)
app.use(user , userorder)
app.use(user , userwallet)
//for seller
app.use(dispatch , dispatchauth)
app.use(dispatch , dispatchprofile)
app.use(dispatch, dispatchorder)

//for admin
app.use(admin, adminauth)
app.use(admin, adminadmin)
app.use(admin, adminhr)




//for admin

//error handler
app.use((req, res, next) => {
  const error = new Error("api not found");
  error.status = 404;
  res.status(404).json({
    status_code: 404,
    status: false,
    message: error.message,
    data: [],
    error: error.message,
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.status(500).json({
    status_code: 500,
    status: false,
    message: error.message,
    data: [],
    error: error.message,
  });
});

const port = PORT || 5000;

http.listen(port, () => console.log("coonected"));

// app.listen(port, () => {
//   console.log("server connected", port);
// });
