class Carrito{

    // Añadir el producto al carrito
    comprarProducto(e){
        if(e.target.parentElement.classList.contains('btn-budget')){
            e.preventDefault();
            let producto = e.target.parentElement.parentElement.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    // Leer los datos del producto
    leerDatosProducto(producto){
        let infoProducto = {
            id: producto.querySelector('.product-id').dataset.id,
            titulo: producto.querySelector('.title h2').textContent,
            brand: producto.querySelector('.product-brand').dataset.id,
            cantidadMinima: producto.querySelector('.product-quantity').dataset.id,
            SKU: producto.querySelector('.product-sku').dataset.id
        };

        let productosLocalStorage;
        productosLocalStorage = this.obtenerProductosLocalStorage();
        
        let productosEnLocalStorage = [...productosLocalStorage].filter( productoLocalStorage => 
            productoLocalStorage.id == infoProducto.id
        );
        //
        if (productosEnLocalStorage.length == 0) {
            this.insertarCarrito(infoProducto);
            
            let alert = document.querySelector('.alert-wrapper');
            alert.querySelector('p').innerHTML = "Producto agregado a la lista."
            alert.style.right = "1vw";
            setTimeout( () => {
                alert.style.right = "-220vw";
            }, 5000)
        } else {
            let alert = document.querySelector('.alert-wrapper');
            alert.querySelector('p').innerHTML = "Este producto ya se encuentra en la lista para presupuestar.";
            alert.style.right = "1vw";
            setTimeout( () => {
                alert.style.right = "-220vw";
            }, 5000)
        }
    }

    // Poner la información del producto dentro del carrito + mensaje
    insertarCarrito(infoProducto){
        this.guardarProductosLocalStorage(infoProducto)
    }

    // Elimina el producto de la vista
    eliminarProducto(e){
        console.log(e.target);
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            // Eliminar del HTML
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('.input-id').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
    }

    // Guardar los datos en el Local Storage
    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // Comprobar si hay productos en el Local Storage
    obtenerProductosLocalStorage(){
        let productosLocalStorage;

        if (localStorage.getItem('productos') === null) {
            productosLocalStorage = [];
        } else {
            productosLocalStorage = JSON.parse(localStorage.getItem('productos'));
        }

        return productosLocalStorage;
        /*
        let productosLocalStorage;
        if(localStorage.getItem('productos') === null){
            productosLocalStorage = [];
        } else {
            productosLocalStorage = JSON.parse(localStorage.getItem('productos'));
        }
        return productosLocalStorage;
        */
    }

    // Eliminar el producto del Local Storage
    eliminarProductoLocalStorage(productoID){
        let productosLocalStorage;
        productosLocalStorage = this.obtenerProductosLocalStorage();
        
        productosLocalStorage.forEach( (productoLocalStorage, index) => {
            if(productoLocalStorage.id === productoID){
                productosLocalStorage.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLocalStorage));
        
        /*
        let productsLocalStorage;
        productsLocalStorage = this.obtenerProductosLocalStorage();
        productsLocalStorage.forEach( (productLocalStorage, index) => {
            if(productLocalStorage.id === productID){
                productsLocalStorage.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productsLocalStorage));
        */
    }

    // Mostrar los productos guardados, dentro del Local Storage, en products/cart
    leerLocalStorageEnCarrito(){
        let productsLocalStorage;
        productsLocalStorage = this.obtenerProductosLocalStorage();
        if(productsLocalStorage.length == 0){
            let row = document.createElement('div');
            row.classList.add('no-product-container');
                row.innerHTML = `
                    <div class="no-product">
                        <p>No se encuentra ningún producto en el presupuesto.</p>
                    </div>
                `;
                document.querySelector('.contenido').append(row);
        } else {
            productsLocalStorage.forEach( (product) => {
                let row = document.createElement('div');
                row.classList.add('product-info-content')
                row.innerHTML = `
                <div class="content-input-container">
                    <div class="product-detail-wrapper">
                        <h1>${product.titulo}</h1>
                        <h2>Marca: ${product.brand}</h2>
                        <h3>MGS${product.SKU}</h3>
                        <input class="input-id" name="product_id" value="${product.id}" type="hidden" data-id="${product.id}">
                    </div>
                </div>
                <div class="content-input-container">
                    <select class="content-input logo-input" name="option" class="option" id="option">
                        <option disabled selected value=""></option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div class="content-input-container qty-container">
                    <p>(Mínimo: ${product.cantidadMinima} unidades)</p>
                    <input class="content-input qty-input" name="quantity" type="number" value="100" min="${product.cantidadMinima}">
                </div>
                <div class="content-input-container delete-container">
                    <i class="fa-sharp fa-solid fa-xmark borrar-producto remove-input"></i>
                </div>
                `;
                document.querySelector('.contenido').append(row);
            })
        }
        ;
    }
    // Calcular los montos
    calcularTotal(){
        let productsLocalStorage;
        let total = 0;
        let subTotal = 0;
        productsLocalStorage = this.obtenerProductosLocalStorage();

        for (let i = 0; i < productsLocalStorage.length; i++) {
            subTotal = Number(productsLocalStorage[i].cantidad);
        }

        total = parseInt(subTotal)
    }

    obtenerEvento(e){
        e.preventDefault();
        let id, qty, product, productsLocalStorage;
        if(e.target.classList.contains('cantidad')){
            product = e.target.parentElement;
            id = product.querySelector('.borrar-producto').getAttribute('data-id');
            qty = product.querySelector('input').value;
            
            let actualizarCantidad = document.querySelectorAll('#subtotales');

            productsLocalStorage = this.obtenerProductosLocalStorage();
            productsLocalStorage.forEach( (productLocalStorage, index) => {
                if(productLocalStorage.id === id){
                    productLocalStorage.cantidad;
                    actualizarCantidad[index].innerHTML = `${Number(qty)}`
                }
            });
            localStorage.setItem('productos', JSON.stringify(productsLocalStorage));
        }
    }

    confirmarPedido(e){
        e.preventDefault();
        let logos = [...document.querySelectorAll('.option')];
        let noLogo = logos.filter( logo => logo.value == '').length;
        let qtyInputs = [...document.querySelectorAll('.qty-input')];
        let inputsValues = qtyInputs.filter( input => parseInt(input.value) < 100).length;
        
        if(noLogo > 0 || inputsValues > 0){
            logos.map( logo => {
                if(logo.value == ''){
                    logo.style.border = '1px solid red';
                    logo.style.borderRadius = '2.4px'
                } else {
                    logo.style.border = '1px solid black';
                    logo.style.borderRadius = '2.4px'
                }
            }),
            qtyInputs.map( input => {
                if(parseInt(input.value) < 100){
                    input.style.border = '1px solid red';
                    input.style.borderRadius = '2.4px'
                } else {
                    input.style.border = '1px solid black';
                    input.style.borderRadius = '2.4px'
                }
            })
        }  else {
            let form = document.getElementById('clientForm');
            form.submit()
        }
    }

    eliminarLocalStorage(){

    }
}