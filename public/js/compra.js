const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra div');
const deleteBtns = document.getElementsByClassName('borrar-producto');
const submitBtn = document.querySelector('.pdf-btn');
const danger = document.querySelectorAll('.text-danger');


cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageEnCarrito());
    
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', (e) => {
            compra.eliminarProducto(e);
        });
    };

    submitBtn.addEventListener('click', (e) => compra.confirmarPedido(e));
}