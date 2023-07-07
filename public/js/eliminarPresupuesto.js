// document.addEventListener('change', (e) => {
//     let checked = [...document.querySelectorAll("input[type='checkbox']:checked")];
//     checked.forEach( check => {
//         eliminarPresupuesto(check);
//     });
// });

// let checkboxes = document.querySelectorAll("input[type='checkbox']");

function eliminarPresupuesto(){
    let checked = [...document.querySelectorAll("input[type='checkbox']:checked")];
    checked.forEach( check => {
        if(check.classList.contains('borrar-presupuesto')){
            // Eliminar del HTML
            check.parentElement.parentElement.parentElement.remove();
        }
    });
}