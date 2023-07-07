let db = require('../database/models');
const { Op } = require('sequelize');
const { sequelize, Sequelize } = require('../database/models');
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

        let pedidoProducto = await db.Products.findAll({
            limit: limit,
            offset: (pageOptions.page - 1) * pageOptions.limit,
            order: [
                ['demanded', 'DESC']
            ]
        });
        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoImagenes = await db.Images.findAll();
        let pedidoMarcas = await db.Brands.findAll();
        let pedidoSubcategorias = await db.Productssubcategories.findAll();

        let pedidoColores = await db.Colors.findAll();
        let pedidoColoresProducto = await db.ProductsColors.findAll();
        
        Promise.all([pedidoProducto, pedidoCategorias, pedidoImagenes, pedidoMarcas, pedidoSubcategorias, pedidoColores, pedidoColoresProducto])
            .then( (all) => {
                // Elimina objetos duplicados en el array. ESTUDIAR BIEN
                let uniqueIds = [];
                let unique = all[2].filter( element => {
                    let isDuplicate = uniqueIds.includes(element.id);

                    if(!isDuplicate){
                        uniqueIds.push(element.id);

                        return true;
                    }

                    return false;
                })
                //----------------------------------------------------------
                
                return res.render('all',{
                    style: ['new.css', 'header.css', 'footer.css'],
                    // style: ['all.css', 'header.css', 'footer.css', 'everyPage.css'],
                    pages: pageArray,
                    actualPage: actualPage,
                    title: 'Catálogo',
                    products: all[0],
                    totalProducts: count,
                    catalogTitle: 'Catálogo',
                    categories: all[1],
                    
                    images: unique,
                    brands: all[3],
                    subcategories: all[4],
                    allColors: all[5],
                    productColors: all[6],
                    links: 'Magus-logo.png'
                })
            })
    },
    category: async (req, res) => {
        let limit = 12;
        let pageOptions = {
            page: req.params.id,
            limit: limit
        };

        let pedidoCategoria = await db.Productscategories.findAll({
            where: {
                title: req.params.name
            }
        });
        let pedidoCategorias = await db.Productscategories.findAll();

        let cantidadTotalDeProductosPedidos = await db.Products.findAndCountAll({
            where: {
                category_id: pedidoCategoria[0].id
            }
        });

        let divide = cantidadTotalDeProductosPedidos.count / limit;
        let pageQuantity = Math.ceil(divide);
        let pageArray = [];
        let actualPage = parseInt(req.params.id);
        for (let a = 0; a <= pageQuantity; a++) {
            if(!a <= 0){
                pageArray.push(a)
            }
        }

        let pedidoProductos = await db.Products.findAll({
            where: {
                category_id: pedidoCategoria[0].id
            },
            limit: limit,
            offset: (pageOptions.page - 1) * pageOptions.limit,
            order: [
                ['demanded', 'DESC']
            ]
        });
        let pedidoMarcas = await db.Brands.findAll();
        let pedidoImagenes = await db.Images.findAll();
        let pedidoSubcategorias = await db.Productssubcategories.findAll();

        let pedidoColores = await db.Colors.findAll();
        let pedidoColoresProducto = await db.ProductsColors.findAll();

        Promise.all([pedidoProductos, cantidadTotalDeProductosPedidos.count, pedidoCategoria[0], pedidoCategorias, pedidoMarcas, pedidoImagenes, pedidoSubcategorias, pedidoColores, pedidoColoresProducto])
            .then(function([products, totalProducts, category, categories, brands, images, subcategories, allColors, productColors]){
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

                        if(!isDuplicate){
                            uniqueIds.push(element.id);

                            return true;
                        }

                        return false;
                    })
                    //----------------------------------------------------------
                    res.render("all", {
                        style: ['new.css', 'header.css', 'footer.css'],
                        title: category.title,
                        products: products,
                        totalProducts: totalProducts,
                        images: unique,
                        catalogTitle: category.title,
                        category: category,
                        categories: categories,
                        subcategories: subcategories,
                        brands: brands,
                        actualPage: actualPage,
                        pages: pageArray,
                        allColors: allColors,
                        productColors: productColors,
                        links: 'Magus-logo.png'
                    })
                }
            }
        )
        
    },
    subcategory: async (req, res) => {
        let limit = 12;
        let pageOptions = {
            page: req.params.id,
            limit: limit
        };

        let pedidoCategorias = await db.Productscategories.findAll();
        let actualCategoryTitle = req.params.name;
        let actualCategory = await db.Productscategories.findAll({
            where: {
                title: actualCategoryTitle
            }
        });
        let actualCategoryId = actualCategory[0].id;

        let pedidoSubcategorias = await db.Productssubcategories.findAll();
        let actualSubcategoryTitle = req.params.subname;
        let actualSubcategories = await db.Productssubcategories.findAll({
            where: {
                subtitle: actualSubcategoryTitle,
                product_category: actualCategoryId
            }
        });
        let actualSubcategoryId = actualSubcategories[0].id;
        
        let pedidoProductos = await db.Products.findAll({
            where: {
                category_id: actualCategoryId,
                subcategory_id: actualSubcategoryId
            },
            limit: limit,
            offset: (pageOptions.page - 1) * pageOptions.limit,
            order: [
                ['demanded', 'DESC']
            ]
        });
        let totalProducts = await db.Products.findAndCountAll({
            where: {
                subcategory_id: actualSubcategoryId
            }
        });

        let pedidoMarcas = await db.Brands.findAll();
        let pedidoImagenes = await db.Images.findAll();

        let divide = totalProducts.count / limit;
        let pageQuantity = Math.ceil(divide);
        let pageArray = [];
        let actualPage = parseInt(req.params.id);
        for (let a = 0; a <= pageQuantity; a++) {
            if(!a <= 0){
                pageArray.push(a)
            }
        }

        let pedidoColores = await db.Colors.findAll();
        let pedidoColoresProducto = await db.ProductsColors.findAll();

        Promise.all([pedidoProductos, totalProducts.count, actualCategory[0], pedidoCategorias, pedidoMarcas, pedidoImagenes, actualSubcategories, pedidoSubcategorias, pedidoColores, pedidoColoresProducto])
            .then(function([products, totalProducts, category, categories, brands, images, subcategory, subcategories, allColors, productColors]){
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

                        if(!isDuplicate){
                            uniqueIds.push(element.id);

                            return true;
                        }

                        return false;
                    })
                    //----------------------------------------------------------
                    res.render("all", {
                        style: ['new.css', 'header.css', 'footer.css'],
                        title: `${actualCategoryTitle} | ${actualSubcategoryTitle}`,
                        products: products,
                        totalProducts: totalProducts,
                        images: unique,
                        catalogTitle: `${actualCategoryTitle} - ${actualSubcategoryTitle}`,
                        category: category,
                        categories: categories,
                        subcategory: subcategory,
                        subcategories: subcategories,
                        brands: brands,
                        actualPage: actualPage,
                        pages: pageArray,
                        links: 'Magus-logo.png',
                        allColors: allColors,
                        productColors: productColors
                    })
                }
            }
        )
    },
    detail: async (req, res) => {
        let pedidoProducto = await db.Products.findByPk(req.params.id);
        let pedidoProductosRelacionados = await db.Products.findAll({
            limit: 12,
            where: {
                category_id: 1
            },
            order: Sequelize.literal('rand()')
        });
        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoSubcategorias = await db.Productssubcategories.findAll();
        let pedidoMarcas = await db.Brands.findAll();
        let pedidoImagenes = await db.Images.findAll({
            order: [
                ['image_id', 'ASC']
            ],
            where: {
                id: req.params.id
            }
        });
        let pedidoImagesProductosRelacionados = await db.Images.findAll({
            where: {
                image_id: {
                    [Op.endsWith]: '%-1'
                }
            }
        });

        let pedidoColores = await db.Colors.findAll();
        let pedidoColoresProducto = await db.ProductsColors.findAll();
        
        Promise.all([pedidoProducto, pedidoCategorias, pedidoMarcas, pedidoImagenes, pedidoProductosRelacionados, pedidoImagesProductosRelacionados, pedidoSubcategorias, pedidoColores, pedidoColoresProducto])
            .then(function([product, categories, brands, images, relatedProducts, allImages, subcategories, allColors, productColors]){
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
                        productImages: images,
                        products: relatedProducts,
                        images: allImages,
                        categories: categories,
                        subcategories: subcategories,
                        brands: brands,
                        allColors: allColors,
                        productColors: productColors,
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
                style: ['brands.css', 'header.css', 'footer.css'],
                links: 'happy.png',
                brands: brands
            })
        })
        .catch( error => {
            return res.send(`Internal Error: ${error}`)
        })
    },
    brand: async (req, res) => {
        let limit = 12;
        let pageOptions = {
            page: req.params.id,
            limit: limit
        };

        let pedidoMarca = await db.Brands.findOne({
            where: {
                name: req.params.name
            }
        });

        let pedidoProductosMarca = await db.Products.findAll({
            where: {
                brand: pedidoMarca.id
            }
        });
        
        let cantidadTotalDeProductosPedidos = await db.Products.findAndCountAll({
            where: {
                brand: pedidoMarca.id
            }
        });

        let divide = cantidadTotalDeProductosPedidos.count / limit;
        let pageQuantity = Math.ceil(divide);
        let pageArray = [];
        let actualPage = parseInt(req.params.id);
        for (let a = 0; a <= pageQuantity; a++) {
            if(!a <= 0){
                pageArray.push(a)
            }
        }
        
        let pedidoMarcas = await db.Brands.findAll();
        let pedidoImagenes = await db.Images.findAll();
        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoSubcategorias = await db.Productssubcategories.findAll();
        let pedidoColores = await db.Colors.findAll();
        let pedidoColoresProducto = await db.ProductsColors.findAll();

        Promise.all([pedidoProductosMarca, cantidadTotalDeProductosPedidos.count, pedidoMarca, pedidoImagenes, pedidoCategorias, pedidoSubcategorias, pedidoMarcas, pedidoColores, pedidoColoresProducto])
            .then(function([products, totalProducts, brand, images, categories, subcategories, brands, allColors, productColors]){
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

                        if(!isDuplicate){
                            uniqueIds.push(element.id);

                            return true;
                        }

                        return false;
                    })
                    //----------------------------------------------------------
                    res.render("all", {
                        style: ['new.css', 'header.css', 'footer.css'],
                        title: brand.name,
                        products: products,
                        totalProducts: totalProducts,
                        images: unique,
                        catalogTitle: brand.name,
                        categories: categories,
                        subcategories: subcategories,
                        brands: brands,
                        actualPage: actualPage,
                        pages: pageArray,
                        allColors: allColors,
                        productColors: productColors,
                        links: 'Magus-logo.png'
                    })
                }
            }
        )
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