const { body } = require('express-validator');

const validations = [
    body('client').notEmpty().withMessage("Por favor, ingrese su nombre."),
    body('email')
        .notEmpty().withMessage("Por favor, ingrese su correo electrónico.")
        .bail()
        .isEmail().withMessage("Debe escribir un formato de correo válido."),
    body('phone')
        .notEmpty().withMessage("Por favor, ingrese su número de teléfono.")
        .bail()
];

module.exports = validations;