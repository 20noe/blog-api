const express = require('express')
const session = require('express-session')


const auth = (req,res,next)=>
{
    next()
        // try{
        //     if(req.cookies["Token"] == undefined || !req.cookies["Token"])
        //     {
        //         res.redirect('/login')
        //     }
        //     else
        //     {
        //         next()
        //     }
        
        // }
        // catch(err)
        // {
        //     console.log(err)
        // }
    
}

module.exports = {auth}