const url = 'https://api.reposteriafamoso.com'
const urlTest = 'http://localhost:1234'
const form = document.getElementById('registerForm')

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
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
    
        const formData = new FormData(form); // Crear FormData a partir de un formulario
    
        // Convertir FormData a un objeto JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
    
        console.log(data);
    
        fetch(urlTest+'/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                notyf.open({
                    type: 'success',
                    message: 'Bienvenido',
                    duration: 3000,
                    ripple: true,
                    dismissible: true
                });
                setTimeout(() => {
                    window.location.href = 'sell.html';
                }, 2000);
                
            } else {
                notyf.open({
                    type: 'error',
                    message: data.message,
                    duration: 3000,
                    ripple: true,
                    dismissible: true
                });
            }
        }).catch(error => {
            console.error('Error:', error);
            notyf.open({
                type: 'error',
                message: 'Error al registrar usuario',
                duration: 3000,
                ripple: true,
                dismissible: true
            });
        });
            
    })
});

