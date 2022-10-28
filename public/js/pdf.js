let download = document.getElementById('download');
let id = document.getElementById('id').innerHTML;

download.addEventListener('click', () => {
    let invoice = this.document.getElementById('invoice');
    console.log(invoice);
    html2pdf().from(invoice).save(`Presupuesto #${id}.pdf`);

    setTimeout( () => {
        // Después de 2 segundos del click
        window.location = '/presupuestador/redirect';
    }, 2000)
})