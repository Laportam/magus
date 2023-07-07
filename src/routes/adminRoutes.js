const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Controlador
const adminController = require('../controllers/adminController');

// Middlewares
const guest = require('../middlewares/guestMiddleware');
const auth = require('../middlewares/authMiddleware');
const validations = require('../middlewares/validationMiddleware');

// Formulario de Login
router.get('/login', adminController.login);

// Procesar el Login
router.post('/login', adminController.loginProcess);

// Formulario de Registro
router.get('/register', guest, adminController.register);

// Procesar el Registro
router.post('/register', validations, adminController.processRegister);

// Eliminar Admin
router.get('/delete/:id', adminController.delete);

// Modificar Admin
router.get('/edit/:id', adminController.edit);

// Procesar la Modificación de Admin
router.post('/edit/:id', adminController.processEdit);

// Entrar Al Perfil del Admin
router.get('/profile', auth, adminController.adminDetail);

// Dashboard
router.get('/dashboard', adminController.dashboard);

// Logout
router.get('/logout', auth, adminController.logout);

// Productos
router.get('/dashboard/products', adminController.products);

// Eliminar productos
router.post('/dashboard/products', adminController.productsDelete);

module.exports = router;