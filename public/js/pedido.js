const carrito = new Carrito();
const products = document.getElementsByClassName('product'); 
const btns = [...document.querySelectorAll('.cotizar-button')];           

cargarEventos();

function cargarEventos(){
    console.log(products)
    for(let product of products){
        product.addEventListener('click', (e) => {
            console.log(e.target)
            carrito.comprarProducto(e);
        });
    }


    // products.addEventListener('click', (e) => {
    //     carrito.comprarProducto(e);
    // });
}