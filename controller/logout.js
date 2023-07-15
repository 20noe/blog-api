const express = require('express')
const logout = (req,res)=>
{
    res.clearCookie('Token');
    console.log(req.cookies)
    res.send("Logout Successfully")
}

module.exports = {logout}