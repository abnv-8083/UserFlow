module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        console.log("No session found, redirecting...");
        res.redirect('/');
    }
};