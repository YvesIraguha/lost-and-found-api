import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signUpValidation, loginValidation } from './middleware/validation';
import User from '../models/user';

const router = new Router();

//validation


router.post('/signUp', signUpValidation, async(req, res)=>{
    

    //check if user is already in database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');


    //Hashing password
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        firstName:req.body.firstName,
        secondName:req.body.secondName,
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
        phoneNumber:req.body.phoneNumber
    });
    try{
        const savedUser = await user.save();
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.header('signup-token', token).send(req.body);
    } catch(err){
        res.status(400).send(err);
    };

});


 //Login validation
 router.post('/login', loginValidation, async(req, res) =>{
     const {error} = loginValidation(req.body);
     if (error) return res.status(400).send({msg: error.details[0].message});

     const user = await User.findOne({email:req.body.email});
     if(!user) return res.status(400).send('Email or Password Invalid');
  
    const validPass = await bcrypt.compare(req.body.password, user.password);
     if(!validPass) return res.status(400).send('Invalid password');

     res.send('logged in');
 });


module.exports = router;
