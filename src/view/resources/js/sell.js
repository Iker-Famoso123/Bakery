const urlTest = 'http://localhost:1234'
const url = 'https://api.reposteriafamoso.com'

const log = () => {
    window.location.href = "view/sell.html"
}


document.addEventListener('DOMContentLoaded', () => {
    const notyf = new Notyf({
        duration: 3000,
        position: {
            x: 'right',
            y: 'bottom'
        },
        types: [
            {
                type: 'success',
                background: '#2ECC71',
                icon: {
                    tagName: 'i', // Usar Font Awesome
                    className: 'fas fa-check-circle !text-white !text-lg' // Ícono de Font Awesome con clases de estilo
                },
                text: 'Primary Notification!',
                color: 'white'
            },
            {
                // Info notification
                type: 'info',
                background: '#06B6D4',
                icon: {
                    tagName: 'i', // Usar Font Awesome
                    className: 'fas fa-info-circle !text-white !text-lg' // Ícono de información
                },
                text: 'Info Notification!',
                color: 'white'
            },
            {
                // Warning notification
                type: 'warning',
                background: '#FCAA1D',
                icon: {
                    tagName: 'i', // Usar Font Awesome
                    className: 'fas fa-exclamation-triangle !text-white !text-lg' // Ícono de advertencia
                },
                text: 'Warning Notification!',
                color: 'white'
            },
            {
                type: 'error',
                background: '#EF4444', // Rojo intenso para indicar error
                icon: {
                    tagName: 'i', // Usar Font Awesome
                    className: 'fas fa-times-circle !text-white !text-lg' // Ícono de error
                },
                text: 'Error Notification!',
                color: 'white' // Color del texto
            }
        ]
    });
    
    


    window.proceedToSale = async () => {
        const data = collectQuantities()
    
        fetch(url + '/sales', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((response) => {
            console.log("Success: ", response)
            document.querySelectorAll('button + input').forEach( input => {
                input.value = 0
            });
            notyf.open({
                type: 'success',
                message: 'Venta registrada con éxito',
                duration: 3000,
                ripple: true,
                dismissible: true
            });
        })
        .catch((error) => {
            notyf.open({
                type: 'error',
                message: '¡Error al registrar la venta!',
                duration: 3000,
                ripple: true,
                dismissible: true
            });


            
            console.error("Error: ", error);
        })
    
    } 
});

const changeQuantity = (button, delta) => {
    const quantityElement = button.parentElement.querySelector('input')
    let currentQuantity = parseInt(quantityElement.value) || 0 // Asegúrate de manejar valores no numéricos
    let newQuantity = currentQuantity + delta

    if (newQuantity >= 0) {
        quantityElement.value = newQuantity
    }
};

const collectQuantities = () => {
    const quantities = {}
    document.querySelectorAll('button + input').forEach( input => {
        quantities[input.getAttribute('data-id')] = parseInt(input.value)
    })

    return quantities
}





