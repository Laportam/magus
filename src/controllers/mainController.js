let db = require('../database/models');
const { Op } = require('sequelize');

const mainController = {
    index: async (req, res) => {
        // await db.Products.findAll({
        //     limit: 10,
        //     order: [
        //         ['demanded', 'DESC']
        //     ]
        // })
        // .then( products => {
        //     res.render('index', {
        //         style: ['style.css', 'header.css', 'footer.css'],
        //         title: 'Home Page | Welcome',
        //         links: 'happy.png',
        //         products: products
        //     })
        // })

        let pedidoProducto = await db.Products.findAll({
            limit: 10,
            order: [
                ['demanded', 'DESC']
            ]
        });
        let pedidoCategorias = await db.Productscategories.findAll();
        let pedidoImagenes = await db.Images.findAll();
        let pedidoMarcas = await db.Brands.findAll();
        let pedidoClientes = await db.Clients.findAll();
        let pedidoClientesImagenes = await db.ClientsImages.findAll();
        let pedidoColores = await db.Colors.findAll();
        let pedidoColoresProducto = await db.ProductsColors.findAll();
        
        Promise.all([pedidoProducto, pedidoCategorias, pedidoImagenes, pedidoMarcas, pedidoClientes, pedidoClientesImagenes, pedidoColores, pedidoColoresProducto])
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
                
                return res.render('index',{
                    title: 'Home Page | Welcome',
                    style: ['header.css', 'footer.css', 'index.css'],
                    links: 'happy.png',
                    products: all[0],
                    categories: all[1],
                    images: unique,
                    brands: all[3],
                    clients: all[4],
                    clientsImages: all[5],
                    allColors: all[6],
                    productColors: all[7]
                })
            })
    },
    buscar: async (req, res) => {
        let searched = req.body.searched.toLowerCase();
        let numberSearched = searched.replace('mgs', '');

        if(searched.startsWith('mgs') || searched.startsWith('1') || searched.startsWith('2') || searched.startsWith('3') || searched.startsWith('4') || searched.startsWith('5') || searched.startsWith('6') || searched.startsWith('7') || searched.startsWith('8') || searched.startsWith('9')){
            await db.Products
            .findAll({
                where: {
                    SKU: {
                        [Op.startsWith]: numberSearched
                    }
                }
            })
            .then( products => {
                if(products.length == 0 || products == null){
                    res.render('404Product', {
                        style: ['header.css', 'footer.css', 'everyPage.css', '404.css'],
                        title: 'Buscar',
                        links: 'happy.png'
                    })
                } else {
                    res.render('buscar', {
                        
                        style: ['header.css', 'footer.css', 'everyPage.css'],
                        title: 'Buscar',
                        products: products,
                        links: 'happy.png'
                    })
                }
            })
        } else {
            await db.Products
            .findAll({
                where: {
                    name: {
                        [Op.like]: '%' + req.body.searched + '%'
                    }
                }
            })
            .then( products => {
                if(products.length == 0){
                    res.render('404Product', {
                        style: ['header.css', 'footer.css', 'everyPage.css', '404.css'],
                        title: 'Buscar',
                        links: 'happy.png'
                    })
                } else {
                    res.render('buscar', {
                        style: ['header.css', 'footer.css', 'everyPage.css'],
                        title: 'Buscar',
                        products: products,
                        links: 'happy.png'
                    })
                }
            })
        }
    }
}

module.exports = mainController;