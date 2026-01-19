
module.exports = (req, res, next) => {
    // If admin is already logged in, redirect to dashboard
    if (req.session && req.session.admin) {
        return res.redirect('/admin/dashboard');
    }
    // Otherwise, allow to proceed to login page
    next();
}