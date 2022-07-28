/* Botones de los juegos */
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

/* Funcion donde obtengo la REST Api de mis productos */
function fetchData() {
    fetch('../js/shop_cart/products.json')
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            productsArray = data;
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
                              <p class="fs-6 text-muted text-center">${products.stock} Unidades Disponibles</p>
                          </div>
                      </div>
                  </li>
            `
            });
            const containerProduct = document.getElementById('containerProduct');
            containerProduct.innerHTML = card;
        })
        .catch(function (error) {
            location.assign('404.html');
        });
};

/* Botones Agregar Carrito */
document.addEventListener("click", (e) => {
    if (e.target && e.target.matches("button.btn")) {
        addCart(e.target.id);
    };
});

/* Funcion para agregar los productos al carrito */
function addCart(e) {
    idFound = productsArray.find(prod => prod.id == e);
    inCart = cart.find(prod => prod.id == idFound.id);
    if (!inCart) {
        cart.push({ ...idFound, cantidad: 1 });
        checkStock();
    } else {
        let cartFilter = cart.filter(id => id.id != inCart.id);
        if (inCart.cantidad != inCart.stock) {
            cart = [...cartFilter, { ...inCart, cantidad: inCart.cantidad + 1 }];
            checkStock();
        } else
            outStock();
    };
};

/* Funcion para verificar si hay Stock de los productos */
function checkStock() {
    localStorage.setItem('cart', JSON.stringify(cart));
    counterQuantity();/* Llamo a funcion contador de productos en carrito */
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se añadio ${idFound.name} al carrito`,
        showConfirmButton: false,
        "toast": true,
        "background": "#fff",
        "color": "#000",
        timer: 1500
    });
};

/* Funcion mensaje cuando no haya mas Stock */
function outStock() {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Disculpe, no hay mas stock de ${idFound.name}`,
        showConfirmButton: false,
        "toast": true,
        "background": "#fff",
        "color": "#000",
        timer: 1500
    });
};


