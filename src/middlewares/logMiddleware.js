let db = require('../database/models');

async function logMiddleware (req, res, next) {
    
    if(res.locals.isLogged){
        next()
        // return res.redirect('/presupuestador/presupuestador')
    } else {
        return res.redirect('/presupuestador')
    }
}

module.exports = logMiddleware;