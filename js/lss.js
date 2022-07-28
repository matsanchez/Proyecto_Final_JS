let cart = JSON.parse(localStorage.getItem('cart')) || []; /* LocalStorage Carrito de Compras */
let users = JSON.parse(localStorage.getItem('users')) || []; /* LocalStorage Usuarios */

const DOMuser_login = document.getElementById('user_login').innerHTML = `Hola ${users[5] == undefined ? "Invitado" : users[5].name} 😃`; /* Saludo al Usuario */
const DOMcartCounter = document.getElementById('cartCounter'); /* Contador del carrito */
cart.length === 0 ? DOMcartCounter.innerHTML = cart.length + 0 : counterQuantity();

/* Funcion para contar todos los productos dentro del carrito de compras */
function counterQuantity() {
    sumacantidad = 0;
    for (let i = 0; i < cart.length; i++) {
        sumacantidad += cart[i].cantidad;
        DOMcartCounter.innerHTML = sumacantidad;
    };
};

/* Funcion compartida para obtener el id en document */
function getId(str) {
    return document.getElementById(str);
}