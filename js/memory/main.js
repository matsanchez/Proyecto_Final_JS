const DOMboxGame = getId('boxGame');
const DOMmovements = getId('movements');
const DOMhits = getId('hits');
const DOMtime_left = getId('time_left');
const DOMrules = document.querySelector('.rules').innerHTML = `<div class="p_rules_game text-center p-3 bg-light rounded  container col-xxl-5 col-xl-6 col-lg-7" style="--bs-bg-opacity: .3;">
                                                                    <img src="../img/headers_games/header_memory.png" class="container mb-3" alt="">
                                                                    <p><i class="bi bi-check-square-fill me-3"></i>TENES 3 SEGUNDOS PARA MEMORIZAR LAS IMAGENES.</p>
                                                                    <p><i class="bi bi-check-square-fill me-3"></i>EL TIEMPO EMPIEZA A CORRER CUANDO TOQUES CUALQUIER TARJETA.</p>
                                                                    <p><i class="bi bi-check-square-fill me-3"></i>DISPONES DE 30 SEGUNDOS PARA ENCONTRAR LAS COINCIDENCIAS.</p>
                                                                    <p><i class="bi bi-check-square-fill me-3"></i>SI ESTAS PREPARADO/A OPRIME JUGAR.</p>
                                                                    <button class="goGame btn btn-danger px-5 shadow">JUGAR!</button>
                                                                </div>`
document.addEventListener('click', ((e) => { if (e.target && e.target.matches('button.goGame')) { showGameMemory() } }))
//// VARIABLES ////
let showSelect = 0;
let selectCard1;
let selectCard2;
let firstShow;
let secondShow;
let movements = 0;
let hits = 0;
let timer = false;
let timerTime = 30;
let initTime = timerTime;
let countDown;

/////// ARRAY CON ID PARA LOS BOTONES ///////
let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

/////// ARRAY DE TARJETAS Y SU COMPAÑERA /////////
let cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
cards.sort(() => { return Math.random() - 0.5 });

////// ARRAY CARPETAS IMAGENES ////////
let imgThemes = ["card_beach", "card_covid_19", "card_fast_food", "card_halloween", "card_magic", "card_random", "card_social_media", "card_web_design"];
for (let i = 0; i < 8; i++) {
    imgThemes.sort(() => Math.random() - 0.5);
}

/* Configuracion cuenta regresiva del juego */
function countTime() {
    countDown = setInterval(() => {
        timerTime--;
        DOMtime_left.innerHTML = `TIEMPO<br>${timerTime} segundos`;
        timerTime == 0 && (clearInterval(countDown), blockGameMemory(), whenFinishTime(), DOMtime_left.innerHTML = `<h5><b>SE ACABO EL TIEMPO<b></h5>`);
    }, 1000);
}

/* Configuracion al finalizar el tiempo, muestra la ubicacion de las imagenes */
function blockGameMemory() {
    for (let i = 0; i < ids.length; i++) {
        const element = getId(i);
        element.classList.remove('bg_card_memory');
        element.innerHTML = `<img src="../img/cards_game_memory/${imgThemes[0]}/${cards[i]}.png" alt="Card" class="cards_game_memory">`;
        element.disabled = true;
        element.classList.add('btn_memory_block')
    }
}

/* Configuracion de despliegue de las tarjetas */
function showGameMemory() {
    document.querySelector('.rules').classList.toggle('d-none');
    document.querySelector('.view_game_memory').classList.toggle('d-none');
    for (let i = 0; i < ids.length; i++) {
        const card = `
                    <div id=${[i]} class="btn_memory m-1 bg_card_memory"></div>
                    `;
        DOMboxGame.innerHTML += card;
        const element = getId(i);
        element.classList.remove('bg_card_memory');
        element.innerHTML = `<img src="../img/cards_game_memory/${imgThemes[0]}/${cards[i]}.png" alt="Card" class="cards_game_memory">`;
        element.disabled = true;
        element.classList.add('btn_memory_block');
        setTimeout(() => { /* Aca configuramos el tiempo que las tarjetas se visualizan y se inicia el juego */
            const element = getId(i);
            element.classList.add('bg_card_memory');
            element.innerHTML = "";
            element.disabled = false;
            element.classList.remove('btn_memory_block');
        }, 2000);
    };
};
document.addEventListener('click', ((e) => {
    if (e.target && e.target.matches('div.btn_memory')) {
        selectCar(e.target.id);
    };
}));

/* Configuracion cuando selecciona la tarjeta y luego la otra */
function selectCar(idDiv) {
    timer == false && (countTime(), timer = true);
    showSelect++;
    if (showSelect == 1) {
        selectCard1 = getId(idDiv);
        selectCard1.classList.remove('bg_card_memory');
        firstShow = cards[idDiv];
        selectCard1.innerHTML = `<img src="../img/cards_game_memory/${imgThemes[0]}/${firstShow}.png" alt="Card" class="cards_game_memory">`;
        selectCard1.disabled = true;

    } else if (showSelect == 2) {
        selectCard2 = getId(idDiv);
        selectCard2.classList.remove('bg_card_memory');
        secondShow = cards[idDiv];
        selectCard2.innerHTML = `<img src="../img/cards_game_memory/${imgThemes[0]}/${secondShow}.png" alt="Card" class="cards_game_memory">`;
        selectCard2.disabled = true;
        movements++;
        DOMmovements.innerHTML = `MOVIMIENTOS<br>${movements}`;

        if (firstShow == secondShow) {
            showSelect = 0;
            hits++;
            DOMhits.innerHTML = `ACIERTOS<br>${hits}`;

            if (hits == 8) {
                document.querySelector('.view_game_memory').classList.add('d-none');
                clearInterval(countDown);
                msjWin();
            };

        } else {
            setTimeout(() => {
                selectCard1.innerHTML = "";
                selectCard2.innerHTML = "";
                selectCard1.disabled = false;
                selectCard2.disabled = false;
                showSelect = 0;
                selectCard1.classList.add('bg_card_memory');
                selectCard2.classList.add('bg_card_memory');
            }, 700);
        };
    };
};

/* Configuracion mensaje cuando gana el Juego */
function msjWin() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success mx-1',
            cancelButton: 'btn btn-danger mx-1'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Felicitaciones, lo lograste!',
        html: `<div class="d-flex container">
                <button class="btn-lg mx-1 bg-success btn-success" disabled="disabled"><p class="h6">Obtuviste los <b>${hits}</b> aciertos!</p></button>
                <button class="btn-lg mx-1 bg-danger btn-danger " disabled="disabled"><p class="h6">WoW! lo hiciste en <b>${initTime - timerTime}</b> segundos</p></button>
                <button class="btn-lg mx-1 bg-warning btn-warning " disabled="disabled"><p class="h6">Logrado en <b>${movements}</b> movimientos</p></button>
                </div>`,
        imageUrl: '../img/icons/icon_win.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'Custom image',
        backdrop: `
                rgba(0,0,123,0.4)
                url("../img/raining_win.gif")
                left top
                repeat
            `,
        showCancelButton: true,
        confirmButtonText: 'Volver a Jugar',
        cancelButtonText: 'Ir al Home',
        reverseButtons: true
    }).then((result) => {
        result.isConfirmed ? replayGame() : location.href = "home.html";
    });
};

/* Configuracion mensaje cuando se termina el tiempo */
function whenFinishTime() {
    Swal.fire({
        title: 'Se acabo el Tiempo!😢',
        text: 'Vamos a ver las que te faltaron donde estaban',
        imageUrl: '../img/icons/icon_game_over.png',
        imageWidth: 250,
        imageHeight: 150,
        imageAlt: 'Perdiste el juego',
    });
    replay = document.createElement('div');
    replay.innerHTML = `<button class="btn btn-info container btnReplay mt-1">VOLVER A JUGAR</button>
                        <button class="btn btn-danger container btnReplay mt-2">Salir</button>`;
    DOMboxGame.appendChild(replay);
    document.addEventListener('click', ((e) => { if (e.target && e.target.matches('button.btnReplay')) { e.target.textContent == "Salir" ? location.href = "home.html" : replayGame(), document.querySelector('.view_game_memory').classList.toggle('d-none') } }));
}

/* Configuracion para resetear el juego */
function replayGame() {
    document.querySelector('.rules').classList.toggle('d-none');
    for (let i = 0; i < 8; i++) {
        imgThemes.sort(() => Math.random() - 0.5);
    }
    DOMboxGame.innerHTML = "";
    DOMhits.innerHTML = "ACIERTOS";
    DOMmovements.innerHTML = "MOVIDAS";
    DOMtime_left.innerHTML = "TIEMPO: 30 SEGUNDOS";
    showSelect = 0;
    movements = 0;
    hits = 0;
    timer = false;
    timerTime = 30;
    initTime = timerTime;
    countDown = 0;
    showGameMemory();
};