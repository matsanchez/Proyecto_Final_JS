let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

const DOMuser_login = document.getElementById('user_login').innerHTML = `Hola ${users[5].name} 😃`
const DOMcartCounter = document.getElementById('cartCounter');
const DOMbtn_quiz_game = document.getElementById('quiz_game').addEventListener('click', e => {
    window.open('quiz_game.html', '_self');
})
const DOMbtn_memory_game = document.getElementById('memory_game').addEventListener('click', e => {
    window.open('memory_game.html', '_self');
})
const DOMbtn_hanged_game = document.getElementById('hanged_game').addEventListener('click', e => {
    window.open('hanged.html', '_self');
})

fetchData();

cart.length === 0 ? DOMcartCounter.innerHTML = cart.length + 0 : DOMcartCounter.innerHTML = cart.length;

function fetchData() {
    fetch('../js/shop_cart/products.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            productsArray = data
            let card = '';
            data.forEach(function (products) {
                card += `
            <li class="">
                      <div class="card shadow h-100">
                          <div class="d-flex justify-content-center">
                              <img src=${products.img} class="imgProducts" alt=${products.name}>
                          </div>
                          <div class="card-body p-3">
                              <h3 class="card-title h4 text-center">${products.name}</h3>
                              <p class="text-center h5">$${products.price}</p>
                              <div class="text-center"><button id=${products.id} class="btn btn-warning">Agregar al Carrito</button></div>
                              </div>
                          </div>
                      </div>
                  </li>
            `
            });
            const containerProduct = document.getElementById('containerProduct')
            containerProduct.innerHTML = card
        })
        .catch(function (error) {
            document.write("Error en los servidores")
        })
}

document.addEventListener("click", (e) => {
    if (e.target && e.target.matches("button.btn")) {
        addCart(e.target.id);
    }
})

function addCart(e) {
    const idFound = productsArray.find(prod => prod.id == e)
    const inCart = cart.find(prod => prod.id == idFound.id)
    if (!inCart) {
        cart.push({ ...idFound, cantidad: 1 })
    } else {
        let cartFilter = cart.filter(id => id.id != inCart.id)
        cart = [...cartFilter, { ...inCart, cantidad: inCart.cantidad + 1 }]
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    DOMcartCounter.innerHTML = cart.length
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        "toast": true,
        "background": "#fff",
        "color": "#000",
        timer: 1000
    })
}