/* Nomás arranca */
let titles = document.querySelectorAll('.titles-box h4');
let titlesFr = [...titles];

let widths = [];

for (let i = 0; i < titlesFr.length; i++) {
    widths.push(titlesFr[i].offsetWidth);
};

let productInputs = document.querySelectorAll('.product-detail-wrapper');
let logoInputs = document.querySelectorAll('.logo-input');
let quantityInputs = document.querySelectorAll('.qty-input');
let removeInputs = document.querySelectorAll('.delete-container');

for (let a = 0; a < productInputs.length; a++) {
    productInputs[a].style.width = `${widths[0]}px`;
    logoInputs[a].style.width = `${widths[1]}px`;
    quantityInputs[a].style.width = `${widths[2]}px`;
    removeInputs[a].style.width = `${widths[3]}px`;
    removeInputs[a].style.height = `${widths[3]}px`;
}

/* Cada vez que cambie de ancho la pantalla */

window.addEventListener('resize', () => {
    let titles = document.querySelectorAll('.titles-box h4');
    let titlesFr = [...titles];

    let widths = [];

    let productInputs = document.querySelectorAll('.product-detail-wrapper');
    let logoInputs = document.querySelectorAll('.logo-input');
    let quantityInputs = document.querySelectorAll('.qty-input');
    let removeInputs = document.querySelectorAll('.delete-container');

    for (let i = 0; i < titlesFr.length; i++) {
        widths.push(titlesFr[i].offsetWidth)
    };

    for (let a = 0; a < productInputs.length; a++) {
        productInputs[a].style.width = `${widths[0]}px`;
        logoInputs[a].style.width = `${widths[1]}px`;
        quantityInputs[a].style.width = `${widths[2]}px`;
        removeInputs[a].style.width = `${widths[3]}px`;
        removeInputs[a].style.height = `${widths[3]}px`;
    }
})

