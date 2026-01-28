const express = require('express')
const app = express()
const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter')
const path = require('path')
const session = require('express-session')
const connectDB = require('./db/connectDb')
const PORT = process.env.PORT || 3000

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Set cache control headers for all dynamic routes (no-store for security)
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    // res.set('Pragma', 'no-cache');
    // res.set('Expires', '0');
    next();
});


app.use(session({
    secret:"aluhsuilh",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}))

app.use('/',userRouter)
app.use('/admin',adminRouter)

app.use((req,res,next)=>{
    res.render('user/404')
    next()
})

connectDB()

app.listen(PORT,(error)=>{
    if(error) 
        console.log(error)
    else{
        console.log(`server is running in http://localhost:${PORT}`)
    }
})

module.exports = app;