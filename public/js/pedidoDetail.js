const carrito = new Carrito();
const products = document.getElementsByClassName('product-container'); 
const btn = document.querySelector('.btn-budget')             

cargarEventos();

function cargarEventos(){
    btn.addEventListener('click', (e) => {
        carrito.comprarProducto(e);
    })
}