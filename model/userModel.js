const express = require('express')
const mongoose = require('mongoose')

const User_Schema = new mongoose.Schema({
    username : String,
    email : String,
    password : String
})

module.exports = mongoose.model('Users', User_Schema);