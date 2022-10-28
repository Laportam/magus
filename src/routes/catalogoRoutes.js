const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');
const path = require('path');
const multer = require('multer');

const formValidations = require('../middlewares/productValidationsMiddleware.js');
const imageValidations = require('../middlewares/productImageValidationsMiddleware');
const auth = function guestMiddleware(req, res, next){
  if(!req.session.userLogged){
      return res.redirect('/catalogo/1')
  }
  next();
}

// Storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images/product'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + path.extname(file.originalname))
    }
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb){
    let ext = path.extname(file.originalname);

    if(ext != '.png' && ext != '.jpg' && ext != '.jpeg'){
      req.fileValidationError = "Uno o varios archivos no son los permitidos. Los archivos permitidos son los .jpg, .jpeg, y .png"
      return cb(null, false, req.fileValidationError);
    }
    req.fileValidationSuccess= "¡Tus archivos .jpg, .jpeg, y .png han sido cargados exitosamente!";
    cb(null, true, req.fileValidationSuccess)
  }
});

//--Ruta para ver todas las marcas
router.get('/brands', productController.brands);

//--Ruta para mostrar todos los productos de una marca
router.get('/brand/:name', productController.brand);

//--Ruta para crear un producto GET
router.get('/create', auth, productController.createGet);

//--Ruta para crear un producto POST
router.post('/create', formValidations, productController.createPost);

//--Ruta para crear un producto 2 GET
router.get('/create/:id', auth, productController.createTwoGet);

//--Ruta para crear un producto 2 POST
router.post('/create/:id',  upload.array('image'), productController.createTwoPost);

//--Ruta para ver todos los productos
router.get('/:id', productController.all);

//--Ruta para ver un producto en particular
router.get('/detail/:id', productController.detail);

//--Ruta para ver el editado del producto
router.get('/edit/:id', auth, productController.editGet);

//-- Ruta que envía el producto editado
router.post('/edit/:id', upload.array('image'), productController.editPost);

router.get('/edit/image/:id', auth, productController.editImageGet);

router.post('/edit/image/:id', upload.array('image'), productController.editImagePost);

//--Delete image
router.get('/edit/image/delete/:id', auth, productController.deleteImage);

//--Ruta para eliminar un producto en particular
router.get("/delete/:id", auth, productController.delete);

//--Ruta para ver todos los productos de una categoría en particular.
router.get('/:name/:id', productController.category);



/*
---------------------------------------------
No entiendo por qué router.delete no funciona
---------------------------------------------
*/

module.exports = router;