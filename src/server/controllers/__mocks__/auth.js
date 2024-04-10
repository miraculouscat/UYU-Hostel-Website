const express = require("express");
const ViteExpress = require("vite-express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const cookieParser = require('cookie-parser');
SECRET_KEY = process.env.SECRET_KEY



exports.verifyUserToken = (req, res, next) =>{
  req.user = {id : 1}
  next()
}
  
exports.isAdmin = (req, res, next) =>{
  next()
}

exports.isStaff  = (req, res, next) =>{
  next()
}

exports.isTheCorrectStaff  = (req, res, next) =>{
  next()
}
