let db = require('../database/models');

async function logMiddlewareTwo (req, res, next) {
    
    if(res.locals.isLogged){
        return res.redirect('/presupuestador/all')
        // return res.redirect('/presupuestador/presupuestador')
    } else {
        next()
    }
}

module.exports = logMiddlewareTwo;