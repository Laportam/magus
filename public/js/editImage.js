let button = document.querySelector('.pdf-btn');
let delet = [...document.getElementsByClassName('delete')];
let images = [...document.getElementsByClassName('image')]

button.disabled = true;

document.addEventListener('change', () => {
    let options = document.querySelectorAll('.option');
    let optionValues = [];
    
    for (let i = 0; i < options.length; i++) {
        let value = options[i].value;
        optionValues.push(value);

        
    };

    if(optionValues.length === new Set(optionValues).size){
        document.querySelector('.text-danger').style.display = 'none';
        button.disabled = false;
    } else {
        button.disabled = true;
    }
    
    console.log(optionValues);
});

delet.forEach( d => {
    d.addEventListener('click', (e) => {
        e.preventDefault();
        let confirmation = confirm('Tas seguro, bro?');
        if(confirmation == true){
            location.href = d.href
        } else if (confirmation == false){
            console.log('Denegado, bro')
        }
    })
});

images.forEach( image => {
    image.addEventListener('click', (e) => {
        e.preventDefault()
    })
})