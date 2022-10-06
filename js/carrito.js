class Carrito{
    // Añadir el producto al carrito
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('cotizar-button')){
            let producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        } else if(e.target.parentElement.classList.contains('cotizar-button')){
            let producto = e.target.parentElement.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }
    // Leer los datos del producto
    leerDatosProducto(producto){
        let infoProducto = {
            titulo: producto.querySelector('.product-info a h5').textContent,
            id: producto.querySelector('.cotizar-button').getAttribute('data-id'),
            cantidad: producto.querySelector('.product-info .minimum-required').value,
            SKU: producto.querySelector('.product-info .SKU').value
        }
        let productsLocalStorage;
        productsLocalStorage = this.obtenerProductosLocalStorage();
        let productsInLS = [...productsLocalStorage].filter( product => product.id == infoProducto.id);
        
        if(productsInLS.length == 0){
            this.insertarCarrito(infoProducto)
        } else {
            alert('El producto ya se encuentra en el presupuesto')
        }
    }
    // Poner la información del producto dentro del carrito + mensaje
    insertarCarrito(producto){
        alert(`¡Felicidades! Has agregado ${producto.titulo} al carrito.`);
        this.guardarProductosLocalStorage(producto);
    }
    // Elimina el producto de la vista
    eliminarProducto(e){
        let product, productID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            product = e.target.parentElement.parentElement;
            productID = product.querySelector('.content-input').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productID);
        this.calcularTotal();
    }
    // Guardar los datos en el Local Storage
    guardarProductosLocalStorage(product){
        let products;
        products = this.obtenerProductosLocalStorage();
        products.push(product);
        localStorage.setItem('productos', JSON.stringify(products));
    }
    // Comprobar si hay productos en el Local Storage
    obtenerProductosLocalStorage(){
        let productosLocalStorage;
        if(localStorage.getItem('productos') === null){
            productosLocalStorage = [];
        } else {
            productosLocalStorage = JSON.parse(localStorage.getItem('productos'));
        }
        return productosLocalStorage;
    }
    // Eliminar el producto del Local Storage
    eliminarProductoLocalStorage(productID){
        let productsLocalStorage;
        productsLocalStorage = this.obtenerProductosLocalStorage();
        productsLocalStorage.forEach( (productLocalStorage, index) => {
            if(productLocalStorage.id === productID){
                productsLocalStorage.splice(index, 1);
            }
        });
        localStorage.setItem('productos', JSON.stringify(productsLocalStorage));
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
                row.innerHTML = `
                <div class="product-info-content">
                    <div class="content-input-container">
                        <input class="content-input" name="product_id" type="text" value="${product.id}" data-id="${product.id}" hidden>
                        <input class="content-input" type="text" value="MGS${product.SKU}" data-id="${product.id}" disabled>
                    </div>
                    <div class="content-input-container">
                        <input class="content-input" type="text" value="${product.titulo}" disabled>
                        <input class="content-input" name="title" type="text" value="${product.titulo}" hidden>
                    </div>
                    <div class="content-input-container">
                        <select name="option" class="option" id="option">
                            <option disabled selected value=""></option>
                            <option>1C/1C</option>
                            <option>Full</option>
                            <option>GBR</option>
                            <option>TD</option>
                        </select>
                    </div>
                    <div class="content-input-container">
                        <p>(Cantidad mínima: ${product.cantidad} unidades)</p>
                        <input class="content-input qty-input" name="quantity" type="number" value="${product.cantidad}" min="${product.cantidad}">
                    </div>
                    <div class="content-input-container">
                        <i class="fa-solid fa-square-xmark borrar-producto"></i>
                    </div>
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
            // e.submit()
        }
    }

    eliminarLocalStorage(){

    }

    // sendPdf(e){
    //     e.preventDefault();
    //     // let yesOrNo = confirm('¿Tu consulta está lista para ser enviada?');

    //     if(e.target.classList.contains('pdf-btn')){
    //         const pdf = e.target.parentElement.parentElement;
    //         console.log(pdf);
    //         this.leerPdf(pdf);
    //     };
        
        
    //     // if(yesOrNo == true){
    //     //     alert('¡Gracias por enviar tu consulta!')
    //     // };

        
    // }

    // leerPdf(pdf){
    //     const infoPdf = {
    //         titulo: pdf.querySelector('a h4').textContent,
    //         id: pdf.querySelector('.cotizar-button').getAttribute('data-id'),
    //         cantidad: 0
    //     }
    // }
}