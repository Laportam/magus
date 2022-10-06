const { validationResult } = require("express-validator");
let db = require("../database/models");
const { Op } = require('sequelize');

const presupuestadorController = {
    
    presupuestadorAdminGet: (req, res) => {
        return res.render('presupuestador', {
            title: 'Presupuestador',
            style: ['cotizador.css'],
            links: 'happy.png'
        });
    },
    presupuestadorAdminPost: async (req, res) => {
        
        // Variable donde se encuentran (o no) los errores.
        const resultValidation = validationResult(req);

        // Si hay errores, renderizar lo siguiente:
        if(resultValidation.errors.length > 0) {
            return res.render('presupuestador', {
                title: 'Consulta de Presupuesto',
                style: ['cotizador.css'],
                errors: resultValidation.mapped(),
                oldData: req.body,
                links: 'happy.png'
            });
        }

        // De lo contrario...
        const d = new Date();
        const months = {
            0: 'Enero',
            1: 'Febrero',
            2: 'Marzo',
            3: 'Abril',
            4: 'Mayo',
            5: 'Junio',
            6: 'Julio',
            7: 'Agosto',
            8: 'Septiembre',
            9: 'Octubre',
            10: 'Noviembre',
            11: 'Diciembre'
        };
        const date = d.getDate().toLocaleString('es-ES');
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        let datosDelPresupuesto = {
            client: req.body.client,
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            comment: req.body.comment,
            received_at: `${date} de ${month}, ${year}`
        };

        let presupuestoId = 0;

        await db.Budget.create(datosDelPresupuesto)
        .then( result => presupuestoId += result.id);
        
        let ids = req.body.product_id;
        let title = req.body.title;
        let quantity = req.body.quantity;
        let logoOptions = req.body.option;

        for (let a = 0; a < ids.length; a++) {
            await db.BudgetProduct.create({
                id: presupuestoId,
                product_id: ids[a],
                quantity: quantity[a],
                logo: logoOptions[a]
            })
        };
        
        req.session.bought = true;
        console.log(req.session);

        return res.redirect('/presupuestador/redirect');
    },

    datosGet: (req, res) => {
        return res.render('presupuestadorForm', {
            title: 'Formulario Previo al Presupuestador',
            style: ['cotizador3.css'],
            links: 'happy.png'
        })
    },
    datosPost: (req, res) => {
        // Variable donde se encuentran (o no) los errores.
        const resultValidation = validationResult(req);

        // Si hay errores, renderizar lo siguiente:
        if(resultValidation.errors.length > 0) {
            return res.render('presupuestadorForm', {
                title: 'Formulario Previo al Presupuestador',
                style: ['cotizador3.css'],
                errors: resultValidation.mapped(),
                oldData: req.body,
                links: 'happy.png'
            });
        }

        // De lo contrario...
        const d = new Date();
        const months = {
            0: 'Enero',
            1: 'Febrero',
            2: 'Marzo',
            3: 'Abril',
            4: 'Mayo',
            5: 'Junio',
            6: 'Julio',
            7: 'Agosto',
            8: 'Septiembre',
            9: 'Octubre',
            10: 'Noviembre',
            11: 'Diciembre'
        };
        const date = d.getDate().toLocaleString('es-ES');
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        let datosDelCliente = {
            name: req.body.name,
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            comment: req.body.comment,
            date: `${date} de ${month}, ${year}`
        };

        return res.redirect('/presupuestador/presupuestador');
    },

    presupuestoGet: async (req, res) => {
        let presupuestoNumero = 0;
        await db.BudgetProduct.findByPk(req.params.id)
        .then( result => presupuestoNumero += result.id);

        let budget = await db.Budget.findByPk(req.params.id);
        let budgetProduct = await db.BudgetProduct.findAll({
            where: {
                id: req.params.id
            }
        });
        let product = await db.Products.findAll();
        let pedidoImagenes = await db.Images.findAll({
            where: {
                image_id: {
                    [Op.like]: '%' + '-1'
                }
            }
        });
        
        
        return res.render('presupuesto', {
            title: `Presupuesto ${req.params.id}`,
            style: ['presupuesto.css'],
            datosDb: budget,
            productsDb: budgetProduct,
            product: product,
            images: pedidoImagenes,
            links: 'happy.png'
        })
    },
    presupuestoIIGet: async (req, res) => {
        let presupuestoNumero = 0;
        await db.BudgetProduct.findByPk(req.params.id)
        .then( result => presupuestoNumero += result.id);

        let budget = await db.Budget.findByPk(req.params.id);
        let budgetProduct = await db.BudgetProduct.findAll({
            where: {
                id: req.params.id
            }
        });
        let product = await db.Products.findAll();

        const d = new Date();
        const months = {
            0: 'Enero',
            1: 'Febrero',
            2: 'Marzo',
            3: 'Abril',
            4: 'Mayo',
            5: 'Junio',
            6: 'Julio',
            7: 'Agosto',
            8: 'Septiembre',
            9: 'Octubre',
            10: 'Noviembre',
            11: 'Diciembre'
        };

        const date = d.getDate().toLocaleString('es-ES');
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        const exactDate = `${date} de ${month}, ${year}`;

        return res.render('presupuestoII', {
            title: `Presupuesto ${req.params.id}`,
            style: ['everyPage.css', 'presupuestoII.css'],
            datosDb: budget,
            productsDb: budgetProduct,
            product: product,
            date: exactDate,
            links: 'happy.png'
        })
    },

    presupuestoIIPost: async (req, res) => {
        // Variable donde se encuentran (o no) los errores.
        const resultValidation = validationResult(req);

        let presupuestoNumero = 0;
        await db.BudgetProduct.findByPk(req.params.id)
        .then( result => presupuestoNumero += result.id);

        let budget = await db.Budget.findByPk(req.params.id);
        let budgetProduct = await db.BudgetProduct.findAll({
            where: {
                id: req.params.id
            }
        });
        let product = await db.Products.findAll();

        const d = new Date();
        const months = {
            0: 'Enero',
            1: 'Febrero',
            2: 'Marzo',
            3: 'Abril',
            4: 'Mayo',
            5: 'Junio',
            6: 'Julio',
            7: 'Agosto',
            8: 'Septiembre',
            9: 'Octubre',
            10: 'Noviembre',
            11: 'Diciembre'
        };

        const date = d.getDate().toLocaleString('es-ES');
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        const exactDate = `${date} de ${month}, ${year}`;

        // Si hay errores, renderizar lo siguiente:
        if(resultValidation.errors.length > 0) {
            return res.render('presupuestoII', {
                title: 'Presupuestador',
                style: ['presupuestoII.css'],
                errors: resultValidation.mapped(),
                oldData: req.body,
                datosDb: budget,
                productsDb: budgetProduct,
                product: product,
                date: exactDate,
                links: 'happy.png'
            });
        }

        // Prosigue, nomás
        let clientData = {
            id: req.body.presupuesto,
            client: req.body.cliente,
            company: req.body.empresa,
            received_at: req.body.consulta,
            answered_at: req.body.fecha
        };

        let productData = {
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            product_quantity: req.body.product_quantity,
            product_total: req.body.product_total
        };
        
        return res.render('prueba', {
            title: 'Title',
            style: ['prueba.css'],
            clientData: clientData,
            productData: productData,
            links: 'happy.png'
        })
    },
    successConsultation: (req, res) => {
        return res.render('budgetSuccess', {
            title: '¡Gracias!',
            links: 'happy.png',
            style: ['everyPage.css', 'budgetSuccess.css', 'header.css', 'footer.css']
        })
    },
    // GET 
    allBudgets: async (req, res) => {
        let budgets = await db.Budget.findAll({
            limit: 20,
            order: [
                ['id', 'DESC']
            ]
        });

        return res.render('budgetAll', {
            title: 'Budget All',
            style: ['header.css', 'footer.css', 'everyPage.css', 'budgetAll.css'],
            links: 'happy.png',
            budgets: budgets
        })
    },
    // ELIMINAR PRESUPUESTO
    deleteBudgets: async (req, res) => {
        return res.send(req.body.checbox)
    }
}

module.exports = presupuestadorController;