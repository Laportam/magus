const bannerBtns = [...document.querySelectorAll('.banner-btn-box button i')];
let imgId = 1;
let n = 1;

bannerBtns.forEach( btn => {
    btn.addEventListener('click', (e) => {
        let banners = [...document.querySelectorAll('.figure')];
        if(btn.classList.contains('fa-caret-right')){
            if(n < 3){
                n += 1;
            }
        } else if(btn.classList.contains('fa-caret-left')){
            if(n > 1){
                n -= 1
            }
        }

        console.log(n)        
    })
})

// bannerBtns.forEach( btn => {
//     btn.addEventListener('click', (e) => {
//         console.log(e.target.classList);
//         if(e.target.classList.contains('fa-caret-right')){
//             console.log('Yes');
                
//                 slideRight(e);
//         } else if (e.target.classList.contains('fa-caret-left')) {
//             console.log('Yes, yet again');
                
//                 slideRight(e);
//         }
//     })
// })
/*
function slideRight(e){
    const displayWidth = document.querySelector('.banner-box img:first-child').clientWidth;
    let result = - (imgId - 1) * displayWidth;
    console.log(result);
    if(result < -2526 || result > 0){
        console.log('No, papi');
        imgId -= 1;
        e.target.style.disabled = 'true'
    } else {
        imgId += 1;
        document.querySelector('.banner-box').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
}

function slideLeft(){

}
*/
/*
const imgs = document.querySelectorAll('.img-select a');
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
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage)
*/