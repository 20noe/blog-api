const express = require('express')
const mongoose = require('mongoose');
const blogs = require('./model/AllBlogsModel')

mongoose.connect('mongodb://localhost:27017/blogs').then(()=>
{
    console.log('DB connected')
});


blogs.deleteMany({}).then(()=>
{
    blogs.create(
        [
            {
                title : "First",
                text : "This is testing blog 2",
                confidence : 2
            },
            {
                title : "Second",
                text : "This is testing blog 2",
                confidence : 8
            },
            {
                title : "Third",
                text : "This is testing blog 2",
                confidence : 4
            },
            {
                title : "Fouth",
                text : "This is testing blog 2",
                confidence : 7
            }
            
        ]
    ).then((err,data)=>
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log(data)
        }
        
    })
})

