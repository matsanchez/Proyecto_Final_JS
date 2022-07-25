let cart = JSON.parse(localStorage.getItem('cart')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

const DOMuser_login = document.getElementById('user_login').innerHTML = `Hola ${users[5].name} 😃`

const totalCart = () => {
    return cart.reduce((search, id) => search + id.price * id.cantidad, 0)
}
function showTotal() {
    const total = document.getElementById('totalCart');
    total.innerHTML = `$${totalCart().toLocaleString()}`
}

showCart();

function showCart() {
    const cartSection = document.getElementById('cartSection');
    if (cart.length == 0) {
        const tableEmpty = `
        <div class="cartTitle p-5 bg-warning position-absolute top-50 start-50 translate-middle">
            <h1><b>Tu carrito esta vacio</b></h1>
            <br>
            <h2>Te invito a que pases por nuestra seccion de Merchandising<br> y lleves algo para ti o para regalar</h2>
            <br>
            <a href="home.html">
            <button id="" class="btn btn-light">IR A COMPRAR</button>
            </a>
        </div>
        `

        cartSection.innerHTML += tableEmpty;
    } else {
        const cartTitle = `
            <div class="cartTitle bg-warning">
                <h1>EN SU CARRITO DE COMPRAS</h1>
                <h2>Hay ${cart.length} producto/s seleccionado/s</h2>
            </div>
            `;
        cartSection.innerHTML += cartTitle;
        const cartContainer = `
            <table class="table table-warning text-center">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">FOTO</th>
                    <th scope="col">NOMBRE PRODUCTO</th>
                    <th scope="col">CANTIDAD</th>
                    <th scope="col">PRECIO($)</th>
                    <th scope="col">SUBTOTAL($)</th>
                </tr>
                </thead>
                <tbody id="cartContent" class="align-middle">
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row"></th>
                        <td colspan="3"></td>
                        <td><b class="fs-4">TOTAL:</b></td>
                        <td><b id="totalCart" class="fs-4">$${totalCart().toLocaleString()}</b></td>
                    </tr>
                </tfoot>
            </table>
            <div class="text-center">
            <button id="emptyBtn" class="btn btn-danger">Vaciar Carrito</button><button id="buyBtn" class="btn btn-success m-4">Pagar</button>
            </div>
            `;
        cartSection.innerHTML += cartContainer;
        const cartContent = document.getElementById('cartContent')
        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            const { id, name, img, price, cantidad } = element;
            const cartItem = `
                                <tr id=${id}>
                                    <th scope="row"><i class="trashItem bi bi-trash3-fill fs-4"></i></th>
                                    <td><img src=${img} class="imgProductsCart" alt="${name}"></td>
                                    <td>${name}</td>
                                    <td>
                                        <div class="container__btnItem"><i id="${name}" class="text-danger bi bi-patch-minus-fill __btnItem m-3 p-1" name="-"></i>
                                        <p>${cantidad}</p>
                                        <i id="${name}" class="text-success bi bi-patch-plus-fill __btnItem m-3 p-1" name="+"></i></td></div>
                                    <td>$${price.toLocaleString()}</td>
                                    <td>$${(cantidad * price).toLocaleString()}</td>
                                    </tr>
                    `;
            cartContent.innerHTML += cartItem
        }
    }
}

/* BOTON VACIAR CARRITO */
document.addEventListener('click', (e) => {
    if (e.target && e.target.matches('button#emptyBtn')) {
        emptyCart();
    }
});

function emptyCart() {
    localStorage.removeItem('cart');
    cartSection.innerHTML = `
            <div class="cartTitle p-5 bg-warning position-absolute top-50 start-50 translate-middle">
                <h1><b>Tu carrito esta vacio</b></h1>
                <br>
                <h2>Te invito a que pases por nuestra seccion de Merchandising<br> y lleves algo para ti o para regalar</h2>
                <br>
                <a href="home.html">
                <button id="" class="btn btn-light">IR A COMPRAR</button>
                </a>
            </div>
        `;
}

/* BOTONES ELIMINAR PRODUCTO DEL CARRITO */
document.addEventListener('click', (e) => {
    if (e.target && e.target.matches("i.trashItem")) {
        const productDelete = e.target.parentNode.parentNode
        deleteItem(productDelete)
    }
})
/* FUNCION COMPARTIDA BORRAR ITEM */
function deleteItem(target) {
    const productDelete = target
    const id = productDelete.getAttribute('id')
    const cartFilter = cart.filter(prod => prod.id != id)
    localStorage.setItem('cart', JSON.stringify(cartFilter))
    cart = cartFilter
    productDelete.remove();
    showTotal();
    document.getElementById('cartSection').childNodes[1].childNodes[3].childNodes[0].textContent = `Hay ${cart.length} producto/s seleccionado/s`
    cart.length == 0 && (document.getElementById('cartSection').innerHTML = '', showCart());
}

/* AGREGAR O DISMINUIR CANTIDAD DE CADA PRODUCTO */
document.addEventListener('click', (e) => {
    if (e.target && e.target.matches("i.__btnItem")) {
        itemDelete = e.target.parentNode.parentNode.parentNode
        const id = e.target.id;
        const product = cart.filter(prod => prod.name == id);
        e.target.attributes.name.nodeValue == "+" ? product[0].cantidad++ : product[0].cantidad--;
        const cartFilter = cart.filter(prod => prod.name != id);
        cart = [...cartFilter, ...product];
        localStorage.setItem('cart', JSON.stringify(cart));
        const quantities = e.target.parentNode.childNodes[2];
        quantities.innerHTML = product[0].cantidad;
        const price = e.target.parentNode.parentNode.parentNode.childNodes[11];
        price.innerHTML = `$${product[0].cantidad * product[0].price}`;
        product[0].cantidad == 0 && deleteItem(itemDelete);
        cart.length == 0 ? showCart() : showTotal()
    }
})

const expReg = { user: /^[a-zA-Z0-9\_\-]{4,16}$/, email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, }

document.addEventListener('click', (e) => {
    if (e.target && e.target.matches('button#buyBtn')) {
        reloadSwal()
        function reloadSwal(msjError) {
            msjError = msjError == undefined ? "" : msjError
            Swal.fire({
                title: `<p class="h4">Complete los datos para la facturacion</p>` +
                    `<p class="text-danger h6" id="error">${msjError}</p>`,
                html: '<input id="swal-input1" class="form-control mt-1" placeholder="Tu nombre completo">' +
                    '<input id="swal-input2" class="form-control mt-1" placeholder="tucorreo@correo.com">',
                showCancelButton: true,
                confirmButtonText: 'Pagar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    if (!expReg.email.test(document.getElementById('swal-input2').value)) {
                        return reloadSwal(`Todos los campos son requeridos<br>Ingrese un correo válido`)
                    }
                    let emailForm = `Se envio un correo a ${document.getElementById('swal-input2').value}<br>con las instrucciones para realizar el pago`
                    Swal.fire('Gracias por tu compra', emailForm, 'success')
                    emptyCart();
                }
            })
        }

    }
});