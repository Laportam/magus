function authMiddleware(req, res, next){
    if(!req.session.userLogged) {
        return res.redirect('/admin/login');
    }
    next();
}

module.exports = authMiddleware;