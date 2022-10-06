const path = require('path');

const { body, checkSchema } = require('express-validator');

const formValidations = [
    body('name').notEmpty().withMessage("Debes un nombre para este producto."),
    body('description').notEmpty().withMessage("Debes escribir una descripción para este producto."),
    body('category').exists().withMessage("Debes elegir, al menos, una categoría a la que pertenezca este producto."),
    body('brand').exists().withMessage("Debes elegir una marca a la que pertenezca este producto."),
    body('SKU').notEmpty().withMessage("Debes asignarle un valor MGM a este producto."),
    body('minimum_required').notEmpty().withMessage("Debes asignarle una cantidad mínima para presupuestar a este producto.")
    // body('image').custom( (value, { req }) => {
    //     let files = req.files;
    //     let acceptedExtensions = ['.jpg', '.png', '.jpeg'];

    //     if(files.length == 0){
    //         throw new Error("Tienes que subir 1 imagen, por lo menos.")
    //     } else {
    //         let fileExtensions = [];
    //         let wrongExt = 0;

    //         for (let i = 0; i < files.length; i++) {
    //             if(!acceptedExtensions.includes(path.extname(files[i].originalname))){
    //                 wrongExt++
    //             }

    //             fileExtensions.push(path.extname(files[i].originalname));
    //         };

    //         if(wrongExt > 0){
    //             throw new Error(`Uno o más archivos tienen una extensión no aceptada. Las extensiones aceptadas son ${acceptedExtensions[0]}, ${acceptedExtensions[1]}, y ${acceptedExtensions[2]}.`)
    //         } else {
    //             return true
    //         }
    //     }
    // })
];

module.exports = formValidations;