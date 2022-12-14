const { body } = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage("Tienes que escribir un nombre"),
    body('email')
        .notEmpty().withMessage("Tienes que escribir un correo electrónico").bail()
        .isEmail().withMessage("Debes escribir un formato de correo válido"),
    body('password').notEmpty().withMessage("Tienes que escribir una contraseña")
];

module.exports = validations;