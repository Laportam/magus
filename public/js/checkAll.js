// let checkboxes = document.querySelectorAll("input[type='checkbox']");
// let bigInput = document.querySelector(".budgets-id");
// let ids = document.querySelectorAll(".input-id");

// function checkAll(myChecbox){
//     if (myChecbox.checked == true) {
//         checkboxes.forEach( checkbox => {
//             checkbox.checked = true;
//         });
//         ids.forEach( id => {
//             bigInput.value += id.value + ','
//         });
//     } else {
//         checkboxes.forEach( checkbox => {
//             checkbox.checked = false;
//         });
//         bigInput.value = ''
//     }
// }

let checkboxes = document.querySelectorAll("input[type='checkbox']");
let bigInput = document.querySelector(".budgets-id");
let ids = document.querySelectorAll(".input-id");
let totalInput = [];

function checkAll(myChecbox){
    if (myChecbox.checked == true) {
        checkboxes.forEach( checkbox => {
            checkbox.checked = true;
        });
        ids.forEach( id => {
            // bigInput.value += id.value + ','
            if(totalInput.includes(id.value)){
                // No sumarlo al array
            } else {
                totalInput.push(id.value);
                bigInput.value = totalInput;
            }
            
        });
        console.log(bigInput)
    } else {
        checkboxes.forEach( checkbox => {
            checkbox.checked = false;
        });
        totalInput = [];
        bigInput.value = '';
        console.log(bigInput)
    }
}

function checkOne(input){
    let checked = input.parentElement.children[0];
    if(checked.checked){
        totalInput.push(input.value);
        bigInput.value = totalInput;
        console.log(bigInput)
    } else {
        let valueIndex = totalInput.indexOf(input.value);
        
        if (valueIndex > -1) { 
            totalInput.splice(valueIndex, 1); 
        }
        
        bigInput.value = totalInput;
        console.log(bigInput)
    }
}

function eliminarProducto(){
    let checked = [...document.querySelectorAll("input[type='checkbox']:checked")];
    checked.forEach( check => {
        if(check.classList.contains('borrar-producto')){
            // Eliminar del HTML
            check.parentElement.parentElement.parentElement.remove();
        }
    });
}