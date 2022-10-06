let button = document.querySelector('.pdf-btn');
button.disabled = true;

document.addEventListener('change', () => {
    
    let options = document.querySelectorAll('.option');
    let optionValues = [];
    
    for (let i = 0; i < options.length; i++) {
        let value = options[i].value;
    
        optionValues.push(value);
    };
    
    if(optionValues.length === new Set(optionValues).size){
        document.querySelector('.da').style.display = 'none';
        button.disabled = false;
    } else {
        button.disabled = true;
    }
    
    console.log(optionValues);
});