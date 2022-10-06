const { body } = require('express-validator');

const validations = [
    body('value').notEmpty().withMessage("Debes ingresar un valor"),
    body('gan').notEmpty().withMessage("Debes ingresar un margen de ganancia")
];

module.exports = validations;