const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogs = require('./model/AllBlogsModel')
const {all_blogs, post_blog, get_one,update_one,delete_one} = require('./controller/blogs')
const {login} = require('./controller/login')
const {signup} = require('./controller/signup')
const cookieParser = require('cookie-parser')
const {auth} = require('./middleware/auth')
const {logout} = require('./controller/logout')
const path = require('path')
const session = require('express-session')
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/blogs').then(()=>
{
    console.log('DB connected')
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(methodOverride('_method'));
app.use(cookieParser())

// app.use(auth)

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.get('/',(req,res)=>
{
    try {
        console.log('Cookies: ', req.cookies)
        console.log(req.cookies['Token'])
        // res.send("Hello Ok")
        res.render('index')
    } catch (error) {
        console.log(error)
    }
    
})
app.get('/login',(req,res)=>
{
    res.send("You are not signed in")
})
app.post('/login', login)
app.post('/signup',signup)

app.get('/api/blogs/new',(req,res)=>
{
    res.render('new')
})

app.get('/api/blogs',auth,all_blogs)

app.post('/api/blogs',auth,post_blog)

app.get('/api/blogs/:id',auth,get_one)

app.get('/api/blogs/:id/edit', async(req,res)=>
{
    const id = req.params['id']
    const data = await blogs.findOne({_id : id})
    res.render('edit',{data})
})
app.put('/api/blogs/:id',auth,update_one)

app.delete('/api/blogs/:id',auth,delete_one)

app.get('/logout',logout)


app.listen(5000, ()=>{
    console.log('Server is up at: ',5000)
})