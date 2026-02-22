const express = require('express')
const app = express()
const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter')
const path = require('path')
const session = require('express-session')
const connectDB = require('./db/connectDb')
const userController = require('./controller/userController')
const PORT = process.env.PORT || 3000

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
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

app.use(userController.getNotFound)

connectDB()

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!'); 
})

app.listen(PORT,(error)=>{
    if(error) 
        console.log(error)
    else{
        console.log(`server is running in http://localhost:${PORT}`)
    }
})

module.exports = app;