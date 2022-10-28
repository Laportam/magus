let firstButton = document.querySelector('.f-i button');
let secondButton = document.querySelector('.s-i button');

firstButton.addEventListener('click', () => {
    let productsFirst = document.querySelectorAll('.first');

    for (let a = 0; a < productsFirst.length; a++) {
        productsFirst[a].style.display = 'none';
    }

    let productsSecond = document.querySelectorAll('.second');

    for (let a = 0; a < productsFirst.length; a++) {
        productsSecond[a].style.display = 'flex';
    }
});

secondButton.addEventListener('click', () => {
    let productsFirst = document.querySelectorAll('.first');

    for (let a = 0; a < productsFirst.length; a++) {
        productsFirst[a].style.display = 'flex';
    }

    let productsSecond = document.querySelectorAll('.second');

    for (let a = 0; a < productsFirst.length; a++) {
        productsSecond[a].style.display = 'none';
    }
});

