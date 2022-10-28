const carrito = new Carrito();
const products = document.getElementsByClassName('product-container'); 
const btn = document.querySelector('.detail-budget-btn');           

cargarEventos();

function cargarEventos(){
    btn.addEventListener('click', (e) => {
        carrito.comprarProducto(e);
    })
}