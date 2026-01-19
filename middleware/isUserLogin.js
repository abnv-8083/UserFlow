module.exports = (req,res,next)=>{
    if (req.session && req.session.admin) {
        return res.redirect('/admin/dashboard');
    }
    else if(req.session && req.session.user){
        return res.redirect('/home');
    }
    else{
        next()
    }
}