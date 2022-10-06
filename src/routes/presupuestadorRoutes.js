const express = require('express');
const router = express.Router();
const presupuestadorController = require('../controllers/presupuestadorController');
const validations = require('../middlewares/formValidationMiddleware');
const lastValidations = require('../middlewares/budgetValidationMiddleware');
const log = require('../middlewares/logMiddleware');
const logTwo = require('../middlewares/logMiddlewareTwo');

/* Rutas de datos personales a ingresar previo PEDIDO de presupuesto */
// router.get('/', log, presupuestadorController.datosGet);
// router.post('/', validations, presupuestadorController.datosPost);

/* Rutas de PEDIDO de presupuesto */
router.get('/', logTwo, presupuestadorController.presupuestadorAdminGet);
router.post('/', validations, presupuestadorController.presupuestadorAdminPost);

// Ruta ADMIN de vista de la totalidad de presupuestos
router.get('/all', log, presupuestadorController.allBudgets);
router.post('/all', presupuestadorController.deleteBudgets);

// Ruta ADMIN de vista de presupuesto en particular
// router.get('/presupuesto/:id', presupuestadorController.presupuestoGet);

/* Rutas para ver y modificar el presupuesto */
router.get('/presupuesto/:id', presupuestadorController.presupuestoIIGet);
router.post('/presupuesto/:id', lastValidations, presupuestadorController.presupuestoIIPost);

router.get('/redirect', presupuestadorController.successConsultation);

module.exports = router;