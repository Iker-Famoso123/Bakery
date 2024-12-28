const urlTest = 'http://localhost:1234'
const url = 'https://api.reposteriafamoso.com'

const log = () => {
    window.location.href = "./src/view/sell.html"
}

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

const proceedToSale = async () => {
    const data = collectQuantities()

    fetch(url + '/sales', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((response) => console.log("Success: ", response))
    .catch((error) => console.error("Error: ", error))



}
