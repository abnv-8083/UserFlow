const userService = require('../services/userService');

module.exports.getUserLogin = (req, res) => {
    const msg = req.query.msg
    const icon = req.query.icon
    userService.getUserLogin(res, msg, icon);
}

module.exports.getUserRegister = (req, res) => {
    const msg = req.query.msg
    const icon = req.query.icon
    userService.getUserRegister(res, msg, icon);
}

module.exports.getHomePage = (req, res) => {
    const msg = req.query.msg
    const icon = req.query.icon
    const name = req.query.name
    userService.getHomePage(res, msg, icon, name);
}

module.exports.userLogout = (req,res)=>{
    userService.userLogout(req,res);
}


module.exports.postRegister = async (req,res)=>{
    try {
        const result = await userService.registerUser(req.body);
        if (result.status === 'success') {
            res.redirect('/?msg=User Created Successfully&icon=success');
        } else if (result.msg === 'User Already Exists') {
            res.redirect('/register?msg=User Already Exists&icon=warning');
        } else {
            res.redirect('/register?msg=Server Error&icon=error');
        }
    } catch (error) {
        console.log(error)
        res.redirect('/register?msg=Server Error&icon=error')
    }
}

module.exports.postLogin = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);

        if (result.status === 'success') {
            req.session.user = result.userId;
            res.redirect(`/home?msg=Sucessfuly Login&icon=success&name=${result.name}`);
        } else {
            res.redirect(`/?msg=${result.msg}&icon=error`);
        }
    } catch (error) {
        console.log(error)
        res.redirect('/?msg=Server Error&icon=error')
    }
}

module.exports.getviews = (req,res)=>{
    userService.getviews(res)
}

module.exports.getNotFound = (req,res)=>{
    userService.getNotFound(res)
}