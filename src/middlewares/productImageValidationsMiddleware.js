const path = require('path');
const { body, checkSchema, check } = require('express-validator');

const imageValidations = [
    // checkSchema({
    //     'image': {
    //         custom: {
    //             options: (value, { req, path }) => !!req.files[path],
    //             errorMessage: "El archivo debería ser .jpg, .jpeg, o .png, estúpido."
    //         }
    //     }
    // })
    body('image').custom( (value, { req }) => {
        let files = req.files;

        if(files.length == 0){
            throw new Error("Tienes que subir 1 imagen, por lo menos.")
        }
    })
];

module.exports = imageValidations;