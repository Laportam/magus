const bannerBtns = [...document.querySelectorAll('.banner-btn-box button i')];
let imgId = 1;

bannerBtns.forEach( btn => {
    btn.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-square-caret-right')){
            console.log('Yes');
            imgId += 1;
            slideRight()
        } else if(e.target.classList.contains('fa-square-caret-left')) {
            console.log('Yes, yet again');
            imgId -= 1;
            slideRight()
        }
        // if(bannerBtns.includes(e.target)){
        //     console.log(e.target)
        // }
    })
})

function slideRight(){
    const displayWidth = document.querySelector('.banner-box img:first-child').clientWidth;
    let result = - (imgId - 1) * displayWidth;

   
    if(result < -2526 || result > 0){
        console.log('No, papi');
    } else {
        document.querySelector('.banner-box').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
    
    
}

function slideLeft(){

}

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