const express = require('express')
const mongoose = require('mongoose')

const Blog_Schema = new mongoose.Schema({
    title : String,
    text : String,
    confidence : Number
})

module.exports = mongoose.model('Blogs', Blog_Schema);
