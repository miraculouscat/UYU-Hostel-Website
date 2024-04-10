const express = require("express");
const ViteExpress = require("vite-express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const {prisma} = require("../dbConnector.js");
// const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser');
const { token } = require("morgan");
const {verifyUserToken, isAdmin, isStaff, isTheCorrectStaff } = require("../controllers/auth.js")
SECRET_KEY = process.env.SECRET_KEY


router.post("/login", async (req, res) => {

  let usernameinput = req.body.username
  let passwordinput = req.body.password
  
  
  const findUser = await prisma.staff.findUnique({
    where : {
      username : usernameinput
    }
  })
  

  if (!findUser){

    return res.status(500).json({ message: "User tidak ada" })
    
  } else {
    var correctPassword = bcrypt.compareSync(
        passwordinput,
        findUser.password
      )
    if ((!correctPassword)) {
      return res.status(401).send({message : "Wrong credential"})
    } else if (findUser.is_deleted){
      return res.status(401).send({message : "User doesn't exist"})
    }
    else {
      let payload = { id : findUser.id, role : findUser.role};
      const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: 1800000});

      res.cookie("id", findUser.id, {maxAge : 1800000})
      res.cookie("user", findUser.name, {maxAge : 1800000})
      res.cookie("role", findUser.role, {maxAge : 1800000})
      res.cookie("token", token,{ httpOnly: true , maxAge: 1800000})
      res.status(200).send({
        findUser
      });
    }
  }
}) 

router.get("/logout", async (req, res) => {
  try {
      res.clearCookie("id")
      res.clearCookie("user")
      res.clearCookie("role")
      res.clearCookie("token",{ httpOnly: true}) 
      return res.status(200).send(("logout berhasil!"))
  } catch (e) {
      console.log(e.message);
      return res.status(500).send(e.message)
  }
})


module.exports = router;