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

// 
router.get('/profile', auth, adminController.adminDetail);

// Logout
router.get('/logout', auth, adminController.logout);

module.exports = router;