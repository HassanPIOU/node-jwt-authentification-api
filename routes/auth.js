const router = require('express').Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {register,login} = require('../helpers/validation')
const bcrypt = require('bcryptjs')

 router.post('/register',async(req,res) => {

     // Validation
     const {error} =  register(req.body)
     if (error) return res.status(400).send(error.details[0].message)
     // Check exist
     const emailCheck = await User.findOne({email : req.body.email})

     if (emailCheck) return res.status(400).send('Email already exists')


     // Hash password
         const salt = await bcrypt.genSalt(10)
        const hashed_password = await  bcrypt.hash(req.body.password,salt)

     // Submission
     const user =  new User({
         name : req.body.name,
         email : req.body.email,
         password : hashed_password
     })

     try {
       const saveUser = await user.save()
         res.send({user: user._id})
     } catch (e) {
         res.status(400).send(e)
     }
 })
  router.post('/login',async(req,res)=>{
      const {error} =  login(req.body)
      if (error) return res.status(400).send(error.details[0].message)

      const emailCheck = await User.findOne({email : req.body.email})
      if (!emailCheck) return res.status(400).send('Email/Password is incorrect')

      const passwordCheck = await bcrypt.compare(req.body.password,emailCheck.password)
      if (!passwordCheck) return res.status(400).send('Email/Password is incorrect')



      // JWT token create

      const token = jwt.sign({_id:emailCheck._id},process.env.TOKEN_SECRET_KEY)
      res.header('auth-token',token).send(token)

      res.send('Logged in !')
  })
module.exports = router;