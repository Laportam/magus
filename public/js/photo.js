const banners = document.querySelectorAll('.figure');

let ind = 1;

const bannerBtns = document.querySelectorAll('.banner-btn-box');

bannerBtns[1].addEventListener('click', slideRight);
bannerBtns[0].addEventListener('click', slideLeft);

function slideRight(){
        if(ind < 3){
            bannerBtns[1].disabled = false;
            const displayWidth = document.querySelector('.figure').clientWidth;

            document.querySelectorAll('.figure').forEach( each => {
                each.style.transform = `translateX(${-ind * displayWidth}px)`;
            });
            ind++;
        } else {
            bannerBtns[1].disabled = true
        }
    
}

function slideLeft(){
        if(ind > 1){
            bannerBtns[0].disabled = false;
            const displayWidth = document.querySelector('.figure').clientWidth;
            ind--;

            document.querySelectorAll('.figure').forEach( each => {
                each.style.transform = `translateX(${-(ind - 1) * displayWidth}px)`;
            });
        }  else {
            bannerBtns[0].disabled = true
        }
}