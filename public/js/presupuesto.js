let products = document.getElementsByName('product');
let ganancia = document.querySelector('.gan input');
let subtotal = document.getElementById('subtotal');
let sub = document.querySelector('.sub p:nth-child(2)');
let tot = document.querySelector('.tot p:nth-child(2)');

products.forEach( product => {
    product.addEventListener('change', (e) => {
        let inputs = document.getElementsByName('value');
        let total = 0;

        for (let i = 0; i < inputs.length; i++) {
            if(parseInt(inputs[i].value)){
                total += parseInt(inputs[i].value);
            }
        };
        
        sub.innerHTML = `
            $${total.toLocaleString('es-ES')}
        `;

        // let subtotal = document.getElementById('subtotal');
        // let subtotalText = `
        //     <div class="sub">
        //         <p>Subtotal:</p>
        //         <p>$${total.toLocaleString('es-ES')}</p>
        //     </div>
        // `;
        // subtotal.prepend(subtotalText);

        // if(ganancia == null){
        //     console.log("Gay");
        // } else {
        //     console.log(ganancia.value);
        // }
        
    })
})
    
ganancia.addEventListener('change', () => {
    let gananciaValue = parseInt(ganancia.value);
    let percentage = gananciaValue / 100;
    let subValue = parseInt(sub.innerHTML.trim().substring(1).split('.').join(''));
    let valuePercentage = subValue * percentage;
    let totalFinal = subValue + valuePercentage;
    tot.innerHTML = `
        $${totalFinal.toLocaleString('es-ES')}
    `;
    document.getElementsByName('product_total')[0].value = totalFinal;
    console.log(document.getElementsByName('product_total')[0].value = totalFinal)
})

//     let num = document.getElementsByName('gan');

//     let gan = num / 100;

//     document.getElementById('subtotal').appendChild = `
//         <div class="tot">
//             <p>Total:</p>
//             <p>$${gan}</p>
//         </div>
//     `

    
// })

