const User = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports.getUserLogin = (req, res) => {
    const msg = req.query.msg
    const icon = req.query.icon
    res.render('user/login',{msg,icon});
}

module.exports.getUserRegister = (req, res) => {
    const msg = req.query.msg
    const icon = req.query.icon
    res.render('user/register',{msg,icon});
}

module.exports.getHomePage = (req, res) => {
    const msg = req.query.msg
    const icon = req.query.icon
    res.render('user/home',{msg,icon});
}

module.exports.userLogout = (req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect('/')
        }
    })
}


module.exports.postRegister = async (req,res)=>{
    try {
        let {name,email,password}=req.body
        const userExist = await User.findOne({email:email})
        if(userExist){
            res.redirect('/register?msg=User Already Exist&icon=error')
        }
        else{
            const hashPassword = await bcrypt.hash(password,10)
            const user = new User({
                name:name,
                email:email,
                password:hashPassword,
                status:1,
            })
            await user.save()
            res.redirect('/?msg=User Created Successfully&icon=success')
        }
        
    } catch (error) {
        console.log(error)
        res.redirect('/register?msg=Server Error&icon=error')
        
    }
}

module.exports.postLogin = async (req,res)=>{
    try {
        let{email,password}=req.body
        const checkUser = await User.findOne({email})
        
        if(checkUser){
            const checkPass = await bcrypt.compare(password,checkUser.password)
            if(checkPass){
                if(checkUser.status == 1){
                    req.session.user = checkUser._id
                    res.redirect('/home?msg=Sucessfuly Login&icon=success')
                }
                else{
                    res.redirect('/?msg=Sorry Account is Blocked&icon=warning')
                }
            }
            else{
                res.redirect('/?msg=Incorrect Password &icon=error')
            }
        }else{
            res.redirect('/?msg=User Not Exist &icon=error')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/?msg=Server Error&icon=error')
    }
}