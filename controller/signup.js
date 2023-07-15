const Users = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const saltRounds = 10;
const SECRET_KEY = "1234"
const signup = async (req,res)=>
{
    const {username,email, password} = req.body;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        await Users.create({username,email,password :hash})
    })

    try{
        const Token = jwt.sign({username},SECRET_KEY)
        const options = {
            expire : new Date(Date.now() + 1000 * 60),
            httpOnly:true
        }
        res.status(201).cookie("Token",Token,options).send({Token})
        
    }
    catch(err)
    {
        res.send(err)
    }
    
}


module.exports = {signup}