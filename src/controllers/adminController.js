let db = require("../database/models");
let bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const adminController = {
    login: (req, res) => res.render("admin/login", {
        style: ['login.css'],
        title: "Admin | Login",
        links: 'Magus-logo.png'
    }),

    loginProcess: async (req, res) => {
        // Búsqueda del usuario que entra a loguearse
        let userTologin = await db.Admin.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(userTologin.id)
        
        // Si existe ese usuario que se va a loguear, ocurre la siguiente verificación respecto a su contraseña:
        if(userTologin){
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userTologin.password);
            // Si la contraseña es la correcta, entonces:
            if(isOkThePassword) {
                delete userTologin.password;
                req.session.userLogged = userTologin;
                

                // Si el usuario clickeó sobre el "Recuérdame", entonces:
                if(req.body.remember_user){
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }

                return res.redirect('/admin/dashboard');
                // return res.render('admin/adminDetail', {
                //     title: 'Admin | Login',
                //     style: ['style.css'],
                //     admin: req.session.userLogged,
                //     links: 'Magus-logo.png'
                // })
            }
            // Si la contraseña es incorrecta, entonces que devuelva a la página de Login con el mensaje de error:
            return res.render('admin/login', {
                title: 'Admin | Login',
                style: ['login.css'],
                errors: {
                    password: {
                        msg: `La contraseña ingresada es inválida.`
                    }
                },
                links: 'Magus-logo.png'
            })
        }

        // Si no se encuentra ningún mail, entonces devuelve esto:
        return res.render('admin/login', {
            title: 'Admin | Login',
            style: ['login.css'],
            errors: {
                email: {
                    msg: "No se encuentra el email en nuestra base de datos"
                }
            },
            links: 'Magus-logo.png'
        })
    },

    register: (req, res) => res.render("admin/register", {
        style: ['style.css', 'form.css'],
        title: "Admin | Register",
        links: 'Magus-logo.png'
    }),

    processRegister: async (req, res) => {
        // Variable donde se encuentran (o no) los errores.
        const resultValidation = validationResult(req);

        // Si hay errores, renderizar lo siguiente:
        if(resultValidation.errors.length > 0) {
            return res.render('admin/register', {
                title: 'Admin | Register',
                style: ['style.css', 'form.css'],
                errors: resultValidation.mapped(),
                oldData: req.body,
                links: 'Magus-logo.png'
            });
        }
        // De lo contrario, la función sigue su curso
        // Variable donde se encuentra (o no) el usuario, a través del email ingresado en el formulario, buscándolo en la base de datos.
        let userInDB = await db.Admin.findOne({
            where: {
                email: req.body.email
            }
        });

        // Si el mail ya está en la base de datos, entonces renderizamos lo siguiente:
        if(userInDB) {
            return res.render('admin/register', {
                title: 'Admin | Register',
                style: ['style.css', 'form.css'],
                errors: {
                    email: {
                        msg: "Este email ya está registrado"
                    }
                },
                oldData: req.body,
                links: 'Magus-logo.png'
            });
        }
        // De lo contrario, la función sigue su curso
        // Variable donde se encuentra el usuario a crear, con la información puesta en el body del formulario, a excepción de la contraseña que la hasheamos para que se guarde ya hasheada en la base de datos.
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10)
        }

        // Línea en donde, efectivamente, creamos el usuario en la base de datos.
        db.Admin.create(userToCreate);

        // Redireccionamos al login
        return res.redirect('/admin/login');
    },

    adminDetail: (req, res) => res.render("admin/adminDetail", {
        style: ['adminDetail.css', 'header.css', 'footer.css'],
        title: "Admin | Detail",
        admin: req.session.userLogged,
        links: 'Magus-logo.png'
    }),
    
    // adminEdit: (req, res) => res.render("admin/adminEdit", {style: "adminEdit.css", title: "Admin | Edit", admin: req.session.adminLogged}),

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/");
    },

    delete: async (req, res) => {
        await db.Admin.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/")
    },

    edit: async (req, res) => {
        let requiredAdmin = await db.Admin.findByPk(req.params.id);

        return res.render('edit', {
            title: 'Edit Admin',
            style: ['style.css'],
            admin: requiredAdmin,
            links: 'Magus-logo.png'
        })
    },

    processEdit: async (req, res) => {
        let adminToEdit = await db.Admin.findByPk(req.params.id);

        await db.Admin.update({
            name: req.body.name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10)
        }, {
            where: {
                id: req.params.id
            }
        })
        await adminToEdit.save()
        .then( data => res.redirect("/admin/edit/" + req.params.id));
    },

    dashboard: async (req, res) => {
        res.render('admin/dashboard', {
            style: ['dashboard.css', 'menu.css'],
            title: "Dashboard",
            links: 'Magus-logo.png'
        })
    },

    products: async (req, res) => {
        let pedidoProductos = await db.Products.findAll();
        let pedidoMarcas = await db.Brands.findAll();
        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoSubcategorias = await db.Productssubcategories.findAll();
        let pedidoImagenes = await db.Images.findAll();

        Promise.all([pedidoProductos, pedidoCategorias, pedidoMarcas, pedidoImagenes, pedidoSubcategorias])
            .then(function([products, categories, brands, images, subcategories]){
                if(products == null) {
                    return res.render('404Product', {
                                style: ['404.css', 'header.css', 'footer.css'],
                                title: '404 | Product Not Found',
                                links: 'Magus-logo.png'
                        })
                } else {
                    // Elimina objetos duplicados en el array. ESTUDIAR BIEN
                    let uniqueIds = [];
                    let unique = images.filter( element => {
                        let isDuplicate = uniqueIds.includes(element.id);
                        let first = element.image_id.includes('-1');

                        if(!isDuplicate && first){
                            uniqueIds.push(element);
                            return true;
                        }
                        return false;
                    });
                    // Array de Productos -objetos-
                    let fullProducts = [];

                    // Producto (ID, name, SKU, brand id, category id, subcategory id, image default)
                    for (const i in products) {
                        let newProduct = {
                            id: products[i].id,
                            SKU: products[i].SKU,
                            name: products[i].name,
                            brand: products[i].brand,
                            category: products[i].category_id,
                            subcategory: products[i].subcategory_id,
                            image: {
                                id: products[i].id,
                                filename: 'wink.png',
                                image_id: products[i].id + '-1'
                            },
                            important: products[i].important,
                            activity: products[i].activity
                        };
                        fullProducts.push(newProduct)
                    };

                    // Agregar Imagen
                    for (const a in unique) {
                        let newImage = {
                            id: unique[a].id,
                            filename: unique[a].filename,
                            image_id: unique[a].image_id
                        };
                        for (let b = 0; b < fullProducts.length; b++) {
                            if(fullProducts[b].id == newImage.id){
                                fullProducts[b].image = newImage
                            }  
                        }
                    };

                    // Agregar Marca
                    for (const c in brands) {
                        for (let b = 0; b < fullProducts.length; b++) {
                            if(fullProducts[b].brand == brands[c].id){
                                fullProducts[b].brand = `${brands[c].name}`
                            }  
                        };
                    };

                    // Agregar Categoría
                    for (const d in categories) {
                        for (let b = 0; b < fullProducts.length; b++) {
                            if(fullProducts[b].category == categories[d].id){
                                fullProducts[b].category = `${categories[d].title}`
                            }  
                        };
                    };

                    // Agregar Subcategoría
                    for (const f in subcategories) {
                        for (let b = 0; b < fullProducts.length; b++) {
                            if(fullProducts[b].subcategory == subcategories[f].id){
                                fullProducts[b].subcategory = `${subcategories[f].subtitle}`
                            }  
                        };
                    };
                    
                    /*
                    let unique = images.filter( element => {
                        let isDuplicate = uniqueIds.includes(element.id);

                        if(!isDuplicate){
                            uniqueIds.push(element.id);

                            return true;
                        }

                        return false;
                    });
                    */
                    //----------------------------------------------------------
                    res.render("admin/products", {
                        style: ['adminProducts.css', 'menu.css'],
                        title: "Dashboard",
                        products: fullProducts,
                        links: 'Magus-logo.png'
                    })
                }
            }
        )
        /*
        return res.render('admin/products', {
            style: ['adminProducts.css', 'menu.css'],
            title: "Dashboard",
            links: 'Magus-logo.png',
            products: products
        })
        */
    },

    productsDelete: async (req, res) => {
        return res.send('res send')
        let idsArray = req.body.budgetsId.split(',');

        // for (let i = 0; i < idsArray.length; i++) {
        //     db.Budget.destroy({
        //         where: {
        //             id: idsArray[i]
        //         }
        //     });
        // };

        // return res.redirect('/presupuestador/all')
    }
}

module.exports = adminController;