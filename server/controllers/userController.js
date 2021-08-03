const router = require('express').Router()
const sequelize = require('../db')
const User  = require("../db").import("../models/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/register', (req,res)=>{
   User.create({
    username: req.body.user.username,
    passwordhash: bcrypt.hashSync(req.body.user.password, 13),
  })
    .then(user=>{

      const token = jwt.sign({id: user.id}, process.env.JWT_SEC, {
        expiresIn: 86400
      })
      res.status(200).json({
        user,
        message: `👍 Success! Account for ${user.username} successfully created.`,   
        sessionToken: token
      })
    })
    .catch(err=>{
      res.status(500).json({message : `👎 Something went wrong!`, err})  
    })
})

router.post('/login', (req,res)=>{
  User.findOne({where: {username : req.body.user.username}})
    .then(user=>{
      if(user){
        bcrypt.compare(
          req.body.user.password,
          user.passwordhash,
          (err, match) => {
            if (match){
              const token = jwt.sign({id: user.id}, process.env.JWT_SEC, {
                expiresIn: 86400
              })
              res.status(200).json({
                user,
                message: `${user.username} logged in successfully. 🐸`,
                sessionToken: token   
              })
            } else {
              res.status(502).send({error: '🛑 Incorrect Password! 🛑'})  
            }
          }
        )
      }else {
        res.status(500).json({ error: "User does not exist 🤷‍♂️" })  
      }
    })
    .catch(err=>{
      res.status(500).json({message: '👎 Something went wrong', err})
    })
})
module.exports = router