let checkboxes = document.querySelectorAll("input[type='checkbox']");
let bigInput = document.querySelector(".products-id");
let ids = document.querySelectorAll(".product-id");
let totalInput = [];

let optionMenu = document.querySelector('.select-menu');
let selectBtn = optionMenu.querySelector('.select-btn');
let options = optionMenu.querySelectorAll('.option');
let text = selectBtn.querySelector('p');

let productWrapperArray = document.querySelectorAll('.product-wrapper');

selectBtn.addEventListener('click', () => {
    optionMenu.classList.toggle('active');
})

options.forEach( option => {
    option.addEventListener('click', () => {
        let selectedOption = option.querySelector('p').parentElement.innerHTML;
        let selectedText = option.querySelector('p').innerHTML;
        let selectedTextLength = option.querySelector('p').innerHTML.length;
        if (selectedTextLength == 0) {
            selectBtn.innerHTML = "Marcas";
            selectBtn.style.color = 'black';
            productWrapperArray.forEach( productWrapper => {
                productWrapper.style.display = 'flex'
            })
        } else {
            selectBtn.innerHTML = selectedOption;
            selectBtn.style.color = 'var(--m1b)';
            
            productWrapperArray.forEach( productWrapper => {
                let productBrandText = productWrapper.querySelector('.brand p').innerHTML
                if (productBrandText == selectedText) {
                    productWrapper.style.display = 'flex'
                } else {
                    productWrapper.style.display = 'none'
                }
            })
        }
    })
});

function filterBy(filter){
    console.log(filter)
}

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
        // ids.forEach( id => {
        //     let valueIndex = totalInput.indexOf(id.value);
        
        //     if (valueIndex > -1) { 
        //         totalInput.splice(valueIndex, 1); 
        //     }
            
        //     bigInput.value = totalInput;
        // });
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