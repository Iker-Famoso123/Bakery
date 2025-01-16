const urlTest = 'http://localhost:5555'
const url = 'https://api.reposteriafamoso.com'

const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalText');

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
    
        fetch(url + '/sales', {
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
            }
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
            generateSummary(data);
            modalContent.innerHTML += `<br> Total: $${response.totalValue}`;
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.classList.add('opacity-100', 'pointer-events-auto');

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





