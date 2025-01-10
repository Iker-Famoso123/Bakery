const url = 'https://api.reposteriafamoso.com'

const form = document.getElementById('registerForm')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form); // Crear FormData a partir de un formulario

    // Convertir FormData a un objeto JSON
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(data);

    fetch(url+'/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === 'success') {
                window.location.href = 'login.html'
            } else {
                alert(data.message)
            }
    })
        
})