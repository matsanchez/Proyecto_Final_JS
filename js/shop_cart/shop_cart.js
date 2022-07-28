/* Expresiones regulares para validacion del formulario de compra */
const expReg = { user: /^[a-zA-Z0-9\_\-]{4,16}$/, email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, }

/* Funcion para calcular el subtotal / total y retornarlo a la funcion */
function totalCart() {
    return cart.reduce((search, id) => search + id.price * id.cantidad, 0);
};

/* Funcion suplente para iterar con el DOM y mostrarlo */
function showTotal() {
    const total = document.getElementById('totalCart');
    total.innerHTML = `Subtotal: $${totalCart().toLocaleString()}`;
};

/* Funcion inicial de despliegue */
showCart();

/* Funcion para mostrar el Carrito de Compras  */
function showCart() {
    cartSection = document.getElementById('cartSection');
    if (cart.length == 0) {
        const tableEmpty = `
        <div class="text-center p-5 bg-warning container rounded">
            <h1><b>Tu carrito esta vacio</b></h1>
            <br>
            <h6>Te invito a que pases por nuestra seccion de Merchandising<br> y lleves algo para ti o para regalar</h6>
            <br>
            <a href="home.html">
            <button id="" class="btn btn-light">IR AL HOME</button>
            </a>
        </div>
        `;
        cartSection.innerHTML += tableEmpty; /* Si esta vacio el carrito muestra esto */
    } else {
        const cartTitle = `
            <div class="text-center">
                <div class="text-center"><img src="../img/title_section/header_shop_cart.png" alt="Titulo Carrito Compra"></div>
                <h5 class="bg-warning p-2">Cuenta con ${sumacantidad} producto/s en el Carrito</h5>
            </div>
            `;
        cartSection.innerHTML += cartTitle; /* Titulo de la seccion carrito */
        const cartContainer = `
                <table class="bg-light text-center container rounded table-sm">
                    <tbody id="cartContent" class="align-middle table-bordered"></tbody>
                </table>
                <div class="text-center mb-2">
                    <div class="bg-warning mt-2 p-2"><b id="totalCart" class="fs-5">Subtotal: $${totalCart().toLocaleString()}</b></div>
                </div>
                <div class="text-center">
                    <button id="btnKeepBuying" class="btn_shop_cart btn btn-info">Seguir Comprando</button>
                    <button id="btnEmpty" class="btn_shop_cart btn btn-danger">Vaciar Carrito</button>
                    <button id="btnBuy" class="btn_shop_cart btn btn-success">Pagar</button>
                </div>
            `;
        cartSection.innerHTML += cartContainer; /* Estructura Tabla para el despliegue de las tarjetas */
        const cartContent = document.getElementById('cartContent')
        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            const { id, name, img, price, cantidad, stock } = element;
            const cartItem = `
                                <tr id=${id}>
                                    <td><i class="trashItem bi bi-trash3-fill fs-4"></i></td>
                                    <td><img src=${img} class="imgProductsCart" alt="${name}"></td>
                                    <td>${name}<p class="text_unit_stock text-muted">${stock} Unidades Disponibles</p></td>
                                    <td>
                                        <div class="container__btnItem"><i id="${name}" class="text-danger bi bi-patch-minus-fill __btnItem m-3 p-1" name="-"></i>
                                        <p>${cantidad}</p>
                                        <i id="${name}" class="text-success bi bi-patch-plus-fill __btnItem m-3 p-1" name="+"></i></td></div>
                                    <td class="text_price_unit">Unidad: $${price.toLocaleString()}</td>
                                    <td><b>$${(cantidad * price).toLocaleString()}</b></td>
                                </tr>
                    `;
            cartContent.innerHTML += cartItem; /* Despliegue de los productos del carrito */
        }
    }
}

/* Boton eliminar producto del carrito de manera individual */
document.addEventListener('click', (e) => {
    if (e.target && e.target.matches("i.trashItem")) {
        const productDelete = e.target.parentNode.parentNode;
        deleteItem(productDelete);
    };
});

/* Funcion para eliminar el producto del carrito */
function deleteItem(target) {
    const productDelete = target;
    const id = productDelete.getAttribute('id');
    const cartFilter = cart.filter(prod => prod.id != id);
    localStorage.setItem('cart', JSON.stringify(cartFilter));
    cart = cartFilter;
    productDelete.remove();
    counterQuantity();/* Llamo a funcion contador de productos en carrito */
    showTotal();
    cartSection.childNodes[1].childNodes[3].childNodes[0].textContent = `Cuenta con ${sumacantidad} producto/s en el Carrito`;
    cart.length == 0 && (document.getElementById('cartSection').innerHTML = '', DOMcartCounter.innerHTML = '0', showCart());
};

/* Boton/Funcion para sumar o restar cantidad de los productos y cotejarlo con el stock */
document.addEventListener('click', (e) => {
    if (e.target && e.target.matches("i.__btnItem")) {
        itemDelete = e.target.parentNode.parentNode.parentNode;
        const id = e.target.id;
        const product = cart.filter(prod => prod.name == id);
        (e.target.attributes.name.nodeValue == "+" ? (product[0].cantidad == product[0].stock ? outStock() : product[0].cantidad++) : product[0].cantidad--);
        const cartFilter = cart.filter(prod => prod.name != id);
        cart = [...cartFilter, ...product];
        localStorage.setItem('cart', JSON.stringify(cart));
        const quantity = e.target.parentNode.childNodes[2];
        quantity.innerHTML = product[0].cantidad;
        const price = e.target.parentNode.parentNode.parentNode.childNodes[11];
        price.innerHTML = `<b>$${product[0].cantidad * product[0].price}</b>`;
        product[0].cantidad == 0 && deleteItem(itemDelete);
        counterQuantity();/* Llamo a funcion contador de productos en carrito */
        cartSection.childNodes[1].childNodes[3].childNodes[0].textContent = `Cuenta con ${sumacantidad} producto/s en el Carrito`;
        cart.length == 0 ? showCart() : showTotal();
    };
});

/* Mensaje de alerta que no hay mas stock */
function outStock() {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'No hay mas Stock',
        showConfirmButton: false,
        "toast": true,
        "background": "#fff",
        "color": "#000",
        timer: 1000
    });
};

/* Botones Seguir comprando, vaciar carrito y pagar, con sus eventos */
document.addEventListener('click', (e) => {
    if (e.target && e.target.matches('button.btn_shop_cart')) {
        btnId = e.target.id
        btnId == 'btnBuy' && toPay();
        btnId == 'btnEmpty' && emptyCart();
        btnId == 'btnKeepBuying' && location.assign('./home.html');
    };
});

/* Funcion para eliminar todos los productos */
function emptyCart() {
    DOMcartCounter.innerHTML = '0';
    localStorage.removeItem('cart');
    cartSection.innerHTML = `
                <div class="text-center p-5 bg-warning container rounded">
                    <h1><b>Tu carrito esta vacio</b></h1>
                    <br>
                    <h6>Te invito a que pases por nuestra seccion de Merchandising<br> y lleves algo para ti o para regalar</h6>
                    <br>
                    <a href="home.html">
                    <button id="" class="btn btn-light">IR AL HOME</button>
                    </a>
                </div>
                    `;
};

/* Funcion para confirmar la compra y validacion */
function toPay(){
    reloadSwal();
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
            };
        });
    };
};