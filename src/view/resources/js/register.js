const url = 'https://api.reposteriafamoso.com'

const form = document.getElementById('registerForm')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    const response = await fetch(url+'/auth/register', {
        method: 'POST',
        body: formData,
    })

    const data = await response.json()

    if (data.success) {
        notyf.success('Usuario registrado exitosamente')
        form.reset()
    } else {
        notyf.error(data.message)
    }
})