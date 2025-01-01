import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const urlTest = 'http://localhost:1234'
const url = 'https://api.reposteriafamoso.com'

const log = () => {
    window.location.href = "./src/view/sell.html"
}

// Función para incrementar la cantidad
const incrementQuantity = (button) => {
    const quantityElement = button.parentElement.querySelector('input');
    let currentQuantity = parseInt(quantityElement.value) || 0; // Asegúrate de manejar valores no numéricos
    let newQuantity = currentQuantity + 1;

    quantityElement.value = newQuantity;
};

// Función para decrementar la cantidad
const decrementQuantity = (button) => {
    const quantityElement = button.parentElement.querySelector('input');
    let currentQuantity = parseInt(quantityElement.value) || 0; // Asegúrate de manejar valores no numéricos
    let newQuantity = currentQuantity - 1;

    if (newQuantity >= 0) {
        quantityElement.value = newQuantity;
    }
};

// Asignar eventos a los botones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Botones de incremento
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', () => incrementQuantity(button));
    });

    // Botones de decremento
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', () => decrementQuantity(button));
    });

    document.getElementById('logButton').addEventListener('click', () => log());
});



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
    .then((response) => {
        console.log("Success: ", response)
        document.querySelectorAll('button + input').forEach( input => {
            input.value = 0
        })
        notyf.success('¡Venta registrada con éxito!');
    })
    .catch((error) => console.error("Error: ", error))

}

// Asignar funciones al objeto global `window`
window.log = log;
window.changeQuantity = changeQuantity;
window.proceedToSale = proceedToSale;

