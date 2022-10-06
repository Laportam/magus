let db = require("../database/models");
let bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const adminController = {
    login: (req, res) => res.render("admin/login", {
        style: ['login.css', 'everyPage.css'],
        title: "Admin | Login",
        links: 'happy.png'
    }),

    loginProcess: async (req, res) => {
        let userTologin = await db.Admin.findOne({
            where: {
                email: req.body.email
            }
        });
        
        if(userTologin){
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userTologin.password)
            if(isOkThePassword) {
                delete userTologin.password;
                req.session.userLogged = userTologin;

                if(req.body.remember_user){
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
                }

                return res.redirect('/admin/profile');
                // return res.render('admin/adminDetail', {
                //     title: 'Admin | Login',
                //     style: ['style.css'],
                //     admin: req.session.userLogged,
                //     links: 'happy.png'
                // })
            }
            return res.render('admin/login', {
                title: 'Admin | Login',
                style: 'style.css',
                errors: {
                    password: {
                        msg: `La contraseña ingresada es inválida.`
                    }
                },
                links: 'happy.png'
            })
        }

        return res.render('admin/login', {
            title: 'Admin | Login',
            style: ['style.css'],
            errors: {
                email: {
                    msg: "No se encuentra el email en nuestra base de datos"
                }
            },
            links: 'happy.png'
        })
    },

    register: (req, res) => res.render("admin/register", {
        style: ['style.css', 'form.css'],
        title: "Admin | Register",
        links: 'happy.png'
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
                links: 'happy.png'
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
                links: 'happy.png'
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
        style: ['adminDetail.css', 'header.css', 'footer.css', 'everyPage.css'],
        title: "Admin | Detail",
        admin: req.session.userLogged,
        links: 'happy.png'
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
            links: 'happy.png'
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
    }
}

module.exports = adminController;