const imageContainer = document.querySelector('.image-area');
const fileInput = document.querySelector('.file-input');
const uploadedArea = document.querySelector('.uploaded-area');

imageContainer.addEventListener('click', () => {
    fileInput.click()
});

fileInput.addEventListener('change', (e) => {
    let file = e.target.files;
    if(file){
        for (let i = 0; i < file.length; i++) {
            let kb = 1024;
            let fileName = file[i].name;
            let fileBytes = file[i].size;
            let fileKbArray = (fileBytes / kb).toString().split('.', 2);
            let fileKb = fileKbArray[0].toString() + '.' + fileKbArray[1].slice(0, 2).toString() + ' KB';
            if(fileName.split('.')[0].length >= 5){
                let splitName = fileName.split('.');
                fileName = splitName[0].substring(0, 5) + "... ." + splitName[1];
            }
            let uploaded = document.createElement('li');
            uploaded.classList.add('row');
            uploaded.innerHTML = `
                            <div class="content">
                                <i class="fa-solid fa-file"></i>
                                <div class="details">
                                    <span class="name">${fileName}</span>
                                    <span class="size">${fileKb}</span>
                                </div>
                                <i class="fas fa-check"></i>
                            </div>
                            `;
            console.log(uploaded);
            uploadedArea.append(uploaded);
        }
        
    }
})