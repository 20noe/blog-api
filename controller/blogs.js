const express = require('express')
const blogs = require('../model/AllBlogsModel')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const all_blogs = async(req,res)=>
{
    const data = await blogs.find({})
    res.render('blogs',{data})
}

const post_blog = async(req,res)=>
{
    const {title, text, confidence} = req.body
    const data = await blogs.create({title,text,confidence})
    res.redirect('/api/blogs')
}

const get_one = async(req,res)=>
{
    try
    {
        const id = req.params['id']
        const data = await blogs.findOne({_id : id})
        if (data == {} || data == '' || data == null)
        {
            res.status(404).send('No record found')
        }
        res.render('show',{data})
    }
    catch(e)
    {
        res.send(e.message)
    }
    
}

const update_one = async(req,res)=>
{
    const id = req.params['id']
    const {title,text,confidence} = await req.body
    await blogs.findOneAndUpdate({_id : id},
        {
            title, text, confidence
        }).then((data)=>
        {
            res.redirect('/api/blogs')
        }).catch((err)=>
        {
            res.send(err)
        })
}

const delete_one =  async(req,res)=> 
{
    const id = req.params['id']
    await blogs.findOneAndDelete({_id : id})
    .then((id)=>
    {
        res.redirect('/api/blogs')
    }).catch((err)=>
    {
        res.send(err)
    })
}

module.exports = {all_blogs,post_blog, get_one, update_one,delete_one}