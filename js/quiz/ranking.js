let my_user = users[5] == undefined ? "Invitado" : users[5].name; /* Traer el nombre del usuario */

const DOMranking = document.getElementById('ranking');

/* Desplegar el Score de todos los jugadores */
for (let i = 0; i < users.length; i++) {
    users.sort(function (a, b) {
        if ((a.score_arte_y_literatura + a.score_entretenimiento + a.score_geografia + a.score_historia + a.score_naturaleza_y_ciencia) < ((b.score_arte_y_literatura + b.score_entretenimiento + b.score_geografia + b.score_historia + b.score_naturaleza_y_ciencia))) {
            return 1;
        };
    });
    DOMranking.innerHTML += `
            <tr>
                <th scope="row">${[i + 1]}</th>
                <td class="${users[i].name}">${users[i].name}</td>
                <td>${users[i].scoreAll[i] = users[i].score_arte_y_literatura + users[i].score_entretenimiento + users[i].score_geografia + users[i].score_historia + users[i].score_naturaleza_y_ciencia}</td>
                <td class="disguise_table">${users[i].score_arte_y_literatura}</td>
                <td class="disguise_table">${users[i].score_entretenimiento}</td>
                <td class="disguise_table">${users[i].score_geografia}</td>
                <td class="disguise_table">${users[i].score_historia}</td>
                <td class="disguise_table">${users[i].score_naturaleza_y_ciencia}</td>
              </tr>
    `;
    users[i].name == my_user && (checkUser = `.${my_user}`, checkUser = document.querySelector(checkUser).parentNode.classList.add('bg-warning'));
};

/* Botones de opciones */
document.getElementById('nav_footer').innerHTML = `
            <div class="text-center mb-5">
                <button class="btn btn-info btn_shop_cart" type="button">Ir a Jugar</button>
                <button class="btn btn-danger btn_shop_cart" type="button">Ir al HOME</button>
            </div>`;

/* Acciones de los botones de opciones */
document.addEventListener('click', ((e) => {
    if (e.target && e.target.matches('button.btn')) {
        e.target.textContent == "Ir al HOME" ? location.assign('home.html') : location.assign('./quiz_game.html');
    };
}));
