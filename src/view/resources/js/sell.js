const urlTest = 'http://localhost:1234'
const url = 'https://api-bakery.onrender.com'

const log = () => {
    window.location.href = "./src/view/sell.html"
}

const changeQuantity = (button, delta) => {
    const quantityElement = button.parentElement.children[1];
    let currentQuantity = parseInt(quantityElement.innerText);
    let newQuantity = currentQuantity + delta;

    if (newQuantity >= 0) {
        quantityElement.innerText = newQuantity;
    }
}

const collectQuantities = () => {
    const quantities = {}
    document.querySelectorAll('.quantity').forEach( span => {
        quantities[span.getAttribute('data-id')] = parseInt(span.textContent)
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