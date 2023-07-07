const { validationResult } = require("express-validator");
let db = require("../database/models");
const { Op } = require('sequelize');

const presupuestadorController = {
    presupuestadorAdminGet: (req, res) => {
        return res.render('presupuestador', {
            title: 'Presupuestador',
            style: ['cotizador.css', 'header.css', 'footer.css'],
            links: 'Magus-logo.png'
        });
    },
    presupuestadorAdminPost: async (req, res) => {
        
        // Variable donde se encuentran (o no) los errores.
        const resultValidation = validationResult(req);

        // Si hay errores, renderizar lo siguiente:
        if(resultValidation.errors.length > 0) {
            return res.render('presupuestador', {
                title: 'Consulta de Presupuesto',
                style: ['cotizador.css', 'header.css', 'footer.css'],
                errors: resultValidation.mapped(),
                oldData: req.body,
                links: 'Magus-logo.png'
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
            links: 'Magus-logo.png'
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
                links: 'Magus-logo.png'
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
            links: 'Magus-logo.png'
        })
    },
    presupuestoIIGet: async (req, res) => {
        let presupuestoNumero = 0;
        return res.send(await db.BudgetProduct.findByPk(req.params.id))
        /*
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
            links: 'Magus-logo.png'
        })
        */
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
                links: 'Magus-logo.png'
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
            links: 'Magus-logo.png'
        })
    },
    successConsultation: (req, res) => {
        return res.render('budgetSuccess', {
            title: '¡Gracias!',
            links: 'Magus-logo.png',
            style: ['budgetSuccess.css', 'header.css', 'footer.css']
        })
    },
    // GET 
    allBudgets: async (req, res) => {
        let budgets = await db.Budget.findAll({
            limit: 30,
            order: [
                ['id', 'DESC']
            ]
        });

        if (budgets.length == 0) {
            return res.render('budgetAll', {
                title: 'Budget All',
                style: ['budgetAll.css','menu.css'],
                links: 'Magus-logo.png',
                budgets: null,
                date: null
            })
        } else {
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
    
            // let commaLess = budgets[0].received_at.replace(',','').split(' ');
            // commaLess.splice(1, 1);
            // let month = commaLess[1];
            // let realMonth;
            // for (let i = 0; i < Object.keys(months).length ; i++) {
            //     if (month == months[i]) {
            //         realMonth = i+1
            //     }
            // }
            // let year = commaLess[2].slice(2);
            // let fullDate = {
            //     day: commaLess[0],
            //     month: realMonth,
            //     year: year
            // }
    
            return res.render('budgetAll', {
                title: 'Budget All',
                style: ['budgetAll.css','menu.css'],
                links: 'Magus-logo.png',
                budgets: budgets,
                // date: fullDate
            })
        }
    },
    // ELIMINAR PRESUPUESTO
    deleteBudgets: async (req, res) => {
        
        let idsArray = req.body.budgetsId.split(',');

        for (let i = 0; i < idsArray.length; i++) {
            db.Budget.destroy({
                where: {
                    id: idsArray[i]
                }
            });
        };

        return res.redirect('/presupuestador/all')
    }
}

module.exports = presupuestadorController;