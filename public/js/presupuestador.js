document.addEventListener('DOMContentLoaded', () => {
    let inputs = [...document.querySelectorAll('.input')];
    let spans = [...document.querySelectorAll('span')];
    let clicked = [...document.querySelectorAll('.clicked')];
    let body = document.querySelector('body');
    let form = document.querySelector('form');
    let paragraph = [...document.querySelectorAll('.input p')];

    form.addEventListener('focus', (e) => {
        if(e.target.classList == 'form-info-input'){
            let span = e.target.parentElement.children[1];
            span.classList.add('clicked')
        } 
    }, true);

    form.addEventListener('blur', (e) => {
        let span = e.target.parentElement.children[1];
        span.classList.remove('clicked')
    }, true);

    spans.map( pan => {
        pan.addEventListener('click', (e) => {
            let input = pan.parentElement.children[0];
            input.focus()
        })
    });

    inputs.map( input => {
        input.addEventListener('change', () =>{
            if(input.textContent != null){
                let span = input.children[1];
                span.style.display = 'none';
                
            } else {
                
            }
        })
    })
})