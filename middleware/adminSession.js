module.exports = (req, res, next) => {
    if (req.session && req.session.admin) {
        next();
    } else {
        console.log("No session found, redirecting...");
        res.redirect('/admin/login');
    }
};