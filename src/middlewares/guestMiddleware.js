function guestMiddleware(req, res, next){
    if(req.session.userLogged){
        return res.redirect('/admin/profile');
    }
    next();
}

module.exports = guestMiddleware;