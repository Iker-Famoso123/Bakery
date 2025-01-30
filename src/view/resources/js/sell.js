const urlTest = 'http://localhost:5555'
const url = 'https://api.reposteriafamoso.com'

const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalText');

const ws = new WebSocket('wss://ws.reposteriafamoso.com');

ws.onopen = () => {
    console.log('Connected to WebSocket');
};

ws.onmessage = (event) => {

    console.log('Mensaje recibido del servidor:', event.data);

    try {
        // Intentar parsear el mensaje como JSON
        const data = JSON.parse(event.data);
        
        // Ahora puedes manejar los datos como un objeto JavaScript
        console.log('Datos procesados:', data);

        // Crear el HTML usando map y join
        const summaryHTML = `
        <ul class="text-left list-disc list-inside space-y-2">
            ${data.map(item => {
                // Capitalizar el nombre del producto
                const capitalizedProduct = item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();
                // Crear el li con el producto y su cantidad
                return `<li>${capitalizedProduct}: ${item.quantity}</li>`;
            }).join('')}
        </ul>
        `;

        // Insertar el resumen en el modal
        modalContent.innerHTML = summaryHTML;
    } catch (error) {
        console.error('Error al procesar los datos JSON:', error);
    }

};

ws.onclose = () => {
    console.log('Disconnected from WebSocket');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error.message);
};


const log = () => {
    window.location.href = "view/login.html"
}

const register = () => {
    window.location.href = "view/register.html"
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
        console.log(data);
        const isEmpty = Object.values(data).every(value => value === 0);

        if (isEmpty) {
            notyf.open({
                type: 'warning',
                message: 'No hay productos seleccionados',
                duration: 3000,
                ripple: true,
                dismissible: true
            });
            return
        }
    
        fetch(urlTest + '/sales', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((response) => {
            if (response.error) {
                notyf.open({
                    type: 'error',
                    message: 'No autorizado',
                    duration: 3000,
                    ripple: true,
                    dismissible: true
                });
                window.location.href = "login.html"
            } else {
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
                ws.send(response.newSale.saleId);
                generateSummary(data);
                modalContent.innerHTML += `<br> Total: $${response.newSale.totalValue}`;
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modal.classList.add('opacity-100', 'pointer-events-auto');
            }

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

// Función para abrir el modal
openModal.addEventListener('click', () => {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
});

// Función para cerrar el modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
});

// Cerrar el modal al hacer clic fuera de él
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
    }
});

const generateSummary = (data) => {
    // Filtrar productos con cantidad mayor a 0
    const items = Object.entries(data).filter(([key, value]) => value > 0);

    // Si no hay productos, mostrar un mensaje de que no hay ventas
    if (items.length === 0) {
        modalContent.innerHTML = "No se ha realizado ninguna venta.";
        return;
    }

    // Construir una lista HTML con los productos y cantidades
    const summaryHTML = `
        <ul class="text-left list-disc list-inside space-y-2">
            ${items.map(([product, quantity]) => {
                const capitalizedProduct = product.charAt(0).toUpperCase() + product.slice(1).toLowerCase();
                return `<li>${capitalizedProduct}: ${quantity}</li>`;
            }).join('')}
        </ul>
    `;

    // Insertar el resumen en el modal
    modalContent.innerHTML = summaryHTML;
};

const log_out = () => {
    fetch(url + '/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then((res) => res.json())
    .then((response) => {
        console.log("Success: ", response)
        window.location.href = "login.html"
    })
    .catch((error) => {
        console.error("Error: ", error);
    })  
}





