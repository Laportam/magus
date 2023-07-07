const imgs = document.querySelectorAll('.subimages-container figure');
const imgBtns = [...imgs];
let imgId = 1;


imgBtns.forEach( imgItem => {
    imgItem.addEventListener('click', (e) => {
        e.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.image img:first-child').clientWidth;

    document.querySelector('.image').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

const btns = document.querySelectorAll('.boto');
const realBtns = [...btns];

let ind = 1;

let pageWidth = document.querySelector('main').clientWidth;

realBtns.forEach( btn => {
    // Actualiza el ancho de la página, cada vez que este se cambia, para que así funcione el evento de click
    window.addEventListener('resize', () => {
        pageWidth = document.querySelector('main').clientWidth;
    });

    btn.addEventListener('click', (e) => {
        let mult;
        if (pageWidth >= 360 && pageWidth < 650) {
            if (btn.classList.contains('back')){
                if(ind <= 1){
                    btn.disabled = true;
                } else {
                    ind--;
                    mult = 1;
                    slideProduct(mult)
                }
            } else {
                if (ind >= 16) {
                    btn.disabled = true;
                } else {
                    ind++;
                    mult = 1;
                    slideProduct(mult);
                }
            }
        } else if (pageWidth >= 650 && pageWidth < 1180){
            if (btn.classList.contains('back')){
                if(ind <= 1){
                    btn.disabled = true;
                } else {
                    ind--;
                    mult = 2;
                    slideProduct(mult)
                }
            } else {
                if (ind >= 8) {
                    btn.disabled = true;
                } else {
                    ind++;
                    mult = 2;
                    slideProduct(mult);
                }
            }
        } else if (pageWidth >= 1180) {
            if (btn.classList.contains('back')){
                if(ind <= 1){
                    btn.disabled = true;
                } else {
                    ind--;
                    mult = 4;
                    slideProduct(mult);
                }
            } else {
                if (ind >= 4) {
                    btn.disabled = true;
                } else {
                    ind++;
                    mult = 4;
                    slideProduct(mult);
                }
            }
        }
        
    })

});

function slideProduct(mult){
    const displayWidth = document.querySelector('.related-product-wrapper').clientWidth * mult;
    
    document.querySelectorAll('.related-product-wrapper').forEach( each => {
        each.style.transform = `translateX(${- (ind - 1) * displayWidth}px)`;
    })
};