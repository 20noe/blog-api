const Users = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY = "1234"
const cookie = require('cookie-parser')


const login = (req,res)=>
{
    const {username, password} = req.body;

    Users.findOne({username}).
    then((data)=>
    {
        bcrypt.compare(password, data.password, function(err, result) {
            if(result == true)
            {
                const Token = jwt.sign({username},SECRET_KEY)
                const options = {
                    expire : new Date(Date.now() + 1000 * 60),
                    httpOnly:true
                }
                res.status(201).cookie("Token",Token,options).send({Token})
            }
            else
            {
                res.status(401).send('Invalid User')
                console.log('Invalid User')
            }
        });
    }).catch((err)=>
    {
        res.send(err)
    })

    // res.json({username,password})
}


module.exports = {login}