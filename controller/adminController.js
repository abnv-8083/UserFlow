const Admin = require('../models/adminModel')
const User = require('../models/userModel')


module.exports.getAdminLogin = (req,res)=>{
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const msg = req.query.msg
    const icon = req.query.icon
    res.render('admin/admin_login',{msg,icon})
}

module.exports.getAdminDashboard = async (req,res)=>{
    try {
        const msg = req.query.msg
        const icon = req.query.icon
        const search = req.query.search ? req.query.search.trim() : '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        let query = {};
        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            };
        }
        const totalUsers = await User.countDocuments(query);
        const totalPages = Math.ceil(totalUsers / limit);
        const currUser = await User.find(query).skip(skip).limit(limit);
        res.render('admin/admin_dashboard', {
            msg,
            icon,
            currUser,
            page,
            totalPages,
            limit,
            totalUsers,
            search
        });
    } catch (error) {
        console.log(error)
        res.redirect('/admin/dashboard?msg=Session Error&icon=error')
    }
}

module.exports.postBlock = async (req,res)=>{
    try {
        const userId = req.params.id
        const userExist = await User.findById({_id:userId})
        if(userExist.status==1){
            userExist.status=0
            await userExist.save()
            res.redirect('/admin/dashboard?msg=User Successfully Blocked&icon=success')
        }else{
            res.redirect('/admin/dashboard?msg=Invalid User&icon=error')
        }
    } catch (error) {
        res.redirect('/admin/dashboard?msg=Server Error&icon=error')
    }
}

module.exports.postunblock = async (req,res)=>{
    try {
        const userId = req.params.id
        const userExist = await User.findById({_id:userId})
        if(userExist.status==0){
            userExist.status=1
            await userExist.save()
            res.redirect('/admin/dashboard?msg=User Successfully Unblocked&icon=success')
        }else{
            res.redirect('/admin/dashboard?msg=Invalid User&icon=error')
        }
    } catch (error) {
        res.redirect('/admin/dashboard?msg=Server Error&icon=error')
    }
}

module.exports.postLogin = async (req,res)=>{
    try {
        let{email,password}=req.body
        const checkAdmin = await Admin.findOne({email})
        if(checkAdmin){
            if(password == checkAdmin.password){
                req.session.admin = checkAdmin._id
                res.redirect('/admin/dashboard?msg=Sucessfully Login as Admin&icon=success')
            }else{
                res.redirect('/admin/login?msg=Invalid Password&icon=error')
            }
        }else{
            res.redirect('/admin/login?msg=No Admin Found&icon=error')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/admin/login?msg=Server Error&icon=error')
    }
}

module.exports.postDelete = async (req,res)=>{
    try { 
        const userId = req.params.id
        const delUser = await User.findByIdAndDelete(userId)
        if(delUser){
            res.redirect('/admin/dashboard?msg=User Deleted Successfully&icon=success')
        }else{
            res.redirect('/admin/dashboard?msg=Invalid User&icon=error')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/admin/dashboard?msg=Server Error&icon=error')
    }
}

module.exports.postEdit = async (req,res)=>{
    try {
 
        let{name,email,id}=req.body
        const editUser = await User.findByIdAndUpdate({_id:id},{$set:{name:name,email:email}})
        if(editUser){
            await editUser.save()
            res.redirect('/admin/dashboard?msg=User Edit Successfully&icon=success')
        }else{
            res.redirect('/admin/dashboard?msg=Invalid User&icon=error')
        }
    } catch (error) {
        console.log(error)
        res.redirect('/admin/dashboard?msg=Server Error&icon=error')
    }
}

module.exports.adminLogout = (req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect('/admin/login')
        }
    })
}

