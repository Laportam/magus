const menuIcon = document.querySelector('.nav-right div i');
const menu = document.querySelector('.moveleft-box');

const catalogo = document.querySelector('.catalog');
const subCatalogo = document.querySelector('.moveleft-container').parentElement;
const subMenuIcon = document.querySelector('.catalog i');


menuIcon.addEventListener('click', () => {
     menu.classList.toggle('menu-active');
    
})

catalogo.addEventListener('click', () => {
    subCatalogo.classList.toggle('droplet');
    subMenuIcon.classList.toggle('down-up');
})