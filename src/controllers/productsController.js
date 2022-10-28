let db = require('../database/models');
const { Op } = require('sequelize');
const { sequelize } = require('../database/models');
const { validationResult } = require("express-validator");
const path = require('path');

let productsController = {
    all: async (req, res) => {
        let limit = 12;

        let pageOptions = {
            page: req.params.id,
            limit: limit
        };

        let { count } = await db.Products.findAndCountAll();
        let divide = count / limit;
        let pageQuantity = Math.ceil(divide);
        let pageArray = [];

        let actualPage = parseInt(req.params.id);

        for (let a = 0; a <= pageQuantity; a++) {
            if(!a <= 0){
                pageArray.push(a)
            }
        }

        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoImagenes = await db.Images.findAll();

        await db.Products
        .findAll({
            limit: limit,
            offset: (pageOptions.page - 1) * pageOptions.limit,
            order: [
                ['demanded', 'DESC']
            ]
        })
        .then( products => {
            if(products.length == 0) {
                return res.send('No hay un pingo')
            } else {
                console.log(pageQuantity);
                console.log(pageArray);
                console.log(actualPage);
                res.render('all', {
                    style: ['all.css', 'header.css', 'footer.css', 'everyPage.css'],
                    title: 'Catálogo',
                    products: products,
                    categories: pedidoCategorias,
                    pages: pageArray,
                    actualPage: actualPage,
                    images: pedidoImagenes,
                    links: 'Magus-logo.png'
                })
            }
        })
        .catch( (error) => {
            return res.send(`Internal error: ${error}`);
        })
    },
    category: async (req, res) => {
        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoCategoria = await db.Productscategories.findOne({
            where: {
                title: req.params.name
            }
        });
        let pedidoImagenes = await db.Images.findAll();

        let limit = 6;

        let pageOptions = {
            page: req.params.id,
            limit: limit
        };

        let { count } = await db.Products.findAndCountAll({
            where: {
                brand: pedidoCategoria.id
            }
        });
        let divide = count / limit;
        let pageQuantity = Math.ceil(divide);
        let pageArray = [];

        let actualPage = parseInt(req.params.id);

        for (let a = 0; a <= pageQuantity; a++) {
            if(!a <= 0){
                pageArray.push(a)
            }
        }
        
        await db.Products
        .findAll({
            limit: limit,
            offset: (pageOptions.page - 1) * pageOptions.limit,
            order: [
                ['demanded', 'DESC']
            ],
            where: {
                category_id: pedidoCategoria.id
            }
        })
        .then( products => {
            if(products.length == 0) {
                return res.render('404Category', {
                    style: ['all.css', 'header.css', 'footer.css', 'everyPage.css'],
                    title: '404 Page Not Found',
                    categories: pedidoCategorias,
                    category: req.params.name,
                    links: 'Magus-logo.png'
                })
            } else {
                console.log(pageQuantity);
                console.log(pageArray);
                console.log(actualPage);
                console.log(req.params.name);
                res.render('all', {
                    style: ['all.css', 'header.css', 'footer.css', 'everyPage.css'],
                    title: 'Catálogo',
                    products: products,
                    categories: pedidoCategorias,
                    category: pedidoCategoria,
                    images: pedidoImagenes,
                    pages: pageArray,
                    actualPage: actualPage,
                    links: 'Magus-logo.png'
                })
            }
        })
        .catch( (error) => {
            return res.send(`Internal error: ${error}`);
        })
    },
    detail: async (req, res) => {
        let pedidoProducto = await db.Products.findByPk(req.params.id);
        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoMarcas = await db.Brands.findAll();
        let pedidoImagenes = await db.Images.findAll({
            order: [
                ['image_id', 'ASC']
            ],
            where: {
                id: req.params.id
            }
        });
        
        Promise.all([pedidoProducto, pedidoCategorias, pedidoMarcas, pedidoImagenes])
            .then(function([product, categories, brands, images]){
                if(product == null) {
                    return res.render('404Product', {
                                style: ['header.css', 'footer.css', 'everyPage.css', '404.css'],
                                title: '404 | Product Not Found',
                                links: 'Magus-logo.png'
                        })
                } else {
                    pedidoProducto.increment({
                        demanded: 1
                    });
                    res.render("detailProduct", {
                        style: ['everyPage.css', 'header.css', 'footer.css', 'productDetail.css'],
                        title: "Product | Detail",
                        product: product,
                        categories: categories,
                        brands: brands,
                        images: images,
                        links: 'Magus-logo.png'
                    })
                }
            })
    },
    brands: async (req, res) => {
        await db.Brands.findAll()
        .then( brands => {
            return res.render('brands', {
                title: 'Title',
                style: ['everyPage.css', 'header.css', 'footer.css', 'brands.css'],
                links: 'happy.png',
                brands: brands
            })
        })
        .catch( error => {
            return res.send(`Internal Error: ${error}`)
        })
    },
    brand: async (req, res) => {
        let pedidoMarca = await db.Brands.findOne({
            where: {
                name: req.params.name
            }
        });

        let pedidoImagenes = await db.Images.findAll();

        if(pedidoMarca == null) {
            return res.send('Pete')
        } else {
            let pedidoProductos = await db.Products.findAll({
                where: {
                    brand: pedidoMarca.id
                }
            })
            .then( products => {
                res.render('brand', {
                    style: ['everyPage.css', 'header.css', 'footer.css', 'brand.css'],
                    title: req.params.name,
                    products: products,
                    images: pedidoImagenes,
                    brand: pedidoMarca,
                    category: null,
                    links: 'happy.png'
                })
            })
            .catch( (error) => {
                return res.send(`Internal error: ${error}`);
            })
        }
        
        
    },
    editGet: async (req, res) => {
        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoMarcas = await db.Brands.findAll();
        let productoPedido = await db.Products.findOne({
            where: {
                id: req.params.id
            }
        });

        if(productoPedido == null){
            return res.send('Puto')
        } else {
            return res.render('editProduct', {
                title: `${productoPedido.name} | Editar`,
                style: ['everyPage.css', 'header.css', 'footer.css', 'editProduct.css'],
                links:'happy.png',
                product: productoPedido,
                categories: pedidoCategorias,
                brands: pedidoMarcas
            })
        }
    },
    editPost: async (req, res) => {
        // Producto editado (objeto)
        let productToEdit = await db.Products.findByPk(req.params.id);
        console.log(req.params.id);

        let editedProducted = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category,
            brand: req.body.brand,
            SKU: req.body.SKU,
            minimum_required: req.body.minimum_required,
            image: []
        };
        console.log(editedProducted.id);

        await db.Products.update({
            id: editedProducted.id,
            name: editedProducted.name,
            description: editedProducted.description,
            category_id: editedProducted.category_id,
            brand: editedProducted.brand,
            SKU: editedProducted.SKU,
            minimum_required: editedProducted.minimum_required,
        }, {
            where: {
                id: req.params.id
            }
        })
        await productToEdit.save()

        if(req.files.length > 0){
            for (let c = 0; c < req.files.length; c++) {
                editedProducted.image.push(req.files[c].filename);
                let productImageId = await db.Images.findAll({
                    where: {
                        id: req.params.id
                    }
                });
                let lastIndex = productImageId.length - 1;
                let lastImageId = (parseInt(productImageId[lastIndex].image_id.split('-')[1]) + 1);
                //--MySQL
                await db.Images.create({
                    id: editedProducted.id,
                    filename: editedProducted.image[c],
                    image_id: `${editedProducted.id}-${lastImageId}`
                });
            }
        }
        
        //---------------------------------------------------

        return res.redirect('/catalogo/detail/' + req.params.id)
    },
    editImageGet: async (req, res) => {
        let images = await db.Images.findAll({
            order: [
                ['image_id', 'ASC']
            ],
            where: {id:req.params.id}
        });
        let paramId = req.params.id;

        return res.render('editImagesProduct', {
            title: 'Edit Images',
            style: ['everyPage.css', 'header.css', 'footer.css', 'editImagesProduct.css'],
            links: 'happy.png',
            images: images,
            id: paramId
        })
    },
    editImagePost: async (req, res) => {
        let id = req.params.id;
        let filenames = req.body.filename;
        let options = req.body.option;
        

        for (let i = 0; i < options.length; i++) {
            console.log(filenames[i]);
            await db.Images.update({
                image_id: `${id}-${options[i]}`
            }, {
                where: {
                    filename: filenames[i]
                }
            })
        }

        await db.Images.findAll({
            where: {
                id: id
            }
        }).then( images => {
            return res.redirect('/catalogo/detail/' + id)
        })
    },
    delete: async (req, res) => {
        await db.Products.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/catalogo/1")
    },
    deleteImage: async (req, res) => {
        let id = req.params.id.split('-')[0]

        await db.Images.destroy({
            where: {
                image_id: req.params.id
            }
        });
        res.redirect('/catalogo/edit/image/' + id);
    },
    createGet: async (req, res) => {
        let callCategories = await db.Productscategories.findAll();
        let callBrands = await db.Brands.findAll();

        res.render('productCreate', {
            title: 'Create New Product',
            style: ['everyPage.css', 'create.css'],
            links: 'happy.png',
            categories: callCategories,
            brands: callBrands
        })
    },
    createPost: async (req, res) => {
        let callCategories = await db.Productscategories.findAll();
        let callBrands = await db.Brands.findAll();

        // Variable donde se encuentran (o no) los errores.
        const resultValidation = validationResult(req);

        // Si hay errores, renderizar lo siguiente:
        if(resultValidation.errors.length > 0) {
            return res.render('productCreate', {
                title: 'Create New Product',
                style: ['everyPage.css'],
                errors: resultValidation.mapped(),
                oldData: req.body,
                links: 'happy.png',
                categories: callCategories,
                brands: callBrands             
            });
        };
        
        //--Creación del producto, salvo la imagen
        await db.Products.create({
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category,
            brand: req.body.brand,
            SKU: req.body.SKU,
            minimum_required: req.body.minimum_required
        });

        let productCreatedId = await db.Products.findOne({
            where: {
                name: req.body.name
            }
        });


        return res.redirect('/catalogo/create/' + productCreatedId.id);
    },
    createTwoGet: async (req, res) => {
        let product = await db.Products.findOne({
            where: {
                id: req.params.id
            }
        });
        return res.render('productCreateTwo', {
            title: 'Create New Product II',
            style: ['everPage.css', 'productUploadImage.css'],
            links: 'happy.png',
            product: product
        })
    },
    createTwoPost: async (req, res) => {
        let product = await db.Products.findOne({
            where: {
                id: req.params.id
            }
        });

        let imagesSubmitted = req.files;

        // Variable donde se encuentran (o no) los errores.
        const resultValidationOne = req.fileValidationError;

        // Si hay errores, renderizar lo siguiente:
        if(resultValidationOne) {
            return res.render('productCreateTwo', {
                title: 'Create New Product II',
                style: ['everyPage.css'],
                errors: {
                    msg: resultValidationOne,
                },
                success: {
                    msg: req.fileValidationSuccess,
                },
                oldData: req.body,
                links: 'happy.png',
                product: product
            });
        } else if (imagesSubmitted.length == 0){
            return res.render('productCreateTwo', {
                title: 'Create New Product II',
                style: ['everyPage.css'],
                errors: {
                    msg: "Debes subir 1 archivo, al menos."
                },  
                oldData: req.body,
                links: 'happy.png',
                product: product
            });
        };

        let imagesInDb = await db.Images.findAll({
            where: {
                id: product.id
            }
        });

        if(imagesInDb.length > 0){
            return res.redirect('/catalogo/detail/' + product.id)
        }

        for (let i = 0; i < imagesSubmitted.length; i++) {
            console.log(imagesSubmitted[i].filename);
            console.log(product.id + "-" + (i + 1))
            // Subida de las imágenes a la base de datos
            await db.Images.create({
                id: product.id,
                filename: imagesSubmitted[i].filename,
                image_id: product.id + "-" + (i + 1)
            })
        };

        

        
        return res.redirect('/catalogo/detail/' + product.id);
    }
}

module.exports = productsController;