let db = require('../database/models');

async function userLoggedMiddleware (req, res, next) {
    
    if(req.cookies.userEmail){
        res.locals.isLogged = true;
        let emailInCookie = req.cookies.userEmail;
        let userFromCookie = await db.Admin.findOne({
            where: {
                email: emailInCookie
            }
        });
        
        if(userFromCookie){
            req.session.userLogged = userFromCookie;
        }

        if(req.session && req.session.userLogged){
            res.locals.userLogged = req.session.userLogged;
        }
        console.log(res.locals.userLogged.name)
    } else {
        res.locals.isLogged = false;
    }

    // let emailInCookie = req.cookies.userEmail;
    // let userFromCookie = db.Admin.findByField('email', emailInCookie);
    // let userFromCookie = db.Admin.findOne({
    //     where: {
    //         email: emailInCookie
    //     }
    // });

    // if(userFromCookie){
    //     req.session.userLogged = userFromCookie;
    // }

    // if(req.session && req.session.userLogged){
    //     res.locals.isLogged = true;
    //     res.locals.userLogged = req.session.userLogged;
    // }

    // console.log(res.locals),
    // console.log(res.session);

    next();
}

module.exports = userLoggedMiddleware;