const carrito = new Carrito();
const products = document.getElementsByClassName('product');                 

cargarEventos();

function cargarEventos(){
    console.log(products)
    for(let product of products){
        product.addEventListener('click', (e) => {
            
            carrito.comprarProducto(e);
        });
    }


    // products.addEventListener('click', (e) => {
    //     carrito.comprarProducto(e);
    // });
}