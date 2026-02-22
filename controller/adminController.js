const adminService = require('../services/adminService');

module.exports.getAdminLogin = (req,res)=>{
    const msg = req.query.msg
    const icon = req.query.icon
    adminService.getAdminLogin(res,msg,icon)
}

module.exports.getAdminDashboard = async (req,res)=>{
    const msg = req.query.msg;
    const icon = req.query.icon;
    const search = req.query.search ? req.query.search.trim() : '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    adminService.getAdminDashboard(res, msg, icon, search, page, limit);
}

module.exports.postBlock = async (req,res)=>{
    try {
        const userId = req.params.id;
        const result = await adminService.blockUser(userId);
        if (result.status === 'success') {
            res.redirect('/admin/dashboard?msg=User Successfully Blocked&icon=success');
        } else {
            res.redirect(`/admin/dashboard?msg=${result.msg}&icon=error`);
        }
    } catch (error) {
        res.redirect('/admin/dashboard?msg=Server Error&icon=error')
    }
}

module.exports.postunblock = async (req,res)=>{
    try {
        const userId = req.params.id;
        const result = await adminService.unblockUser(userId);
        if (result.status === 'success') {
            res.redirect('/admin/dashboard?msg=User Successfully Unblocked&icon=success');
        } else {
            res.redirect(`/admin/dashboard?msg=${result.msg}&icon=error`);
        }
    } catch (error) {
        res.redirect('/admin/dashboard?msg=Server Error&icon=error')
    }
}

module.exports.postLogin = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const result = await adminService.loginAdmin(email, password);

        if (result.status === 'success') {
            req.session.admin = result.adminId;
            res.redirect('/admin/dashboard?msg=Sucessfully Login as Admin&icon=success');
        } else {
            res.redirect(`/admin/login?msg=${result.msg}&icon=error`);
        }
    } catch (error) {
        console.log(error)
        res.redirect('/admin/login?msg=Server Error&icon=error')
    }
}

module.exports.postDelete = async (req,res)=>{
    try { 
        const userId = req.params.id;
        const result = await adminService.deleteUser(userId);
        if (result.status === 'success') {
            res.redirect('/admin/dashboard?msg=User Deleted Successfully&icon=success');
        } else {
            res.redirect(`/admin/dashboard?msg=${result.msg}&icon=error`);
        }
    } catch (error) {
        console.log(error)
        res.redirect('/admin/dashboard?msg=Server Error&icon=error')
    }
}

module.exports.postEdit = async (req,res)=>{
    try {
        const { id, name, email } = req.body;
        const result = await adminService.editUser(id, { name, email });
        if (result.status === 'success') {
            res.redirect('/admin/dashboard?msg=User Edit Successfully&icon=success');
        } else {
            res.redirect(`/admin/dashboard?msg=${result.msg}&icon=error`);
        }
    } catch (error) {
        console.log(error)
        res.redirect('/admin/dashboard?msg=Server Error&icon=error')
    }
}

module.exports.adminLogout = (req,res)=>{
    adminService.adminLogout(req,res)
}
