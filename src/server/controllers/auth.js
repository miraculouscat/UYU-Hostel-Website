const express = require("express");
const ViteExpress = require("vite-express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const cookieParser = require('cookie-parser');
SECRET_KEY = process.env.SECRET_KEY



exports.verifyUserToken = (req, res, next) => {

    let token =  req.cookies.token;
    if (!token) {
      return res.status(401).send("Access Denied : No Token");
    } 
    try {
      // token = token.split(" ")[1];
      if (token == null || !token) {
        return res.status(401).send("Access Denied : No Token 2");
      }
      let verifiedUser = jwt.verify(token, SECRET_KEY)
      if (!verifiedUser) {
        return res.status(401).send("Access Denied");
      }
      req.user = verifiedUser;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token")
    }
  }
  
// exports.isAdmin = (req, res, next) =>{
//     if (req.user.role == "admin"){
//         next();
//     } else {
//       return res.status(401).send("Wrong Privilege")
//     }
//   }
exports.isAdmin = (req, res, next) =>{
  next()
}

exports.isStaff  = (req, res, next) =>{
  next()
}

exports.isTheCorrectStaff  = (req, res, next) =>{
  next()
}
// exports.isStaff = (req, res, next) => {
//     if (req.user.role == "user"){
//       next();
//     } else {
//       return res.status(401).send("Wrong Privilege")
//     }
//   }

// exports.isTheCorrectStaff = (req, res, next) => {
//     const {id} = req.params;
//     if ((req.user.id == id) || (req.user.role == "admin")){
//         next();
//     } else {
//         return res.status(401).send("Wrong Privilege")
//     }
// }

