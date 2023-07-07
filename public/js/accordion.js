const btns = document.querySelectorAll('.fa-plus');
let categories = document.querySelectorAll('.categoria');
categories.forEach( category =>{
    let dataId = category.children[0].children[0].children[1];
    let subcategoriesLength = category.children[0].children[0].children[1].children.length;
    dataId.setAttribute('data-id', subcategoriesLength);
})

btns.forEach( btn => {
    btn.addEventListener('click', (e) => {
        let accordion = e.target.parentElement.parentElement.children[0].children[0].children[1];
        console.log(accordion);
        accordion.classList.toggle('accordion');
    })
});