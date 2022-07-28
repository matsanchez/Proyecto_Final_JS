const DOMshowQuiz = document.getElementById('showQuiz');
const DOMtitleQuiz = document.querySelector('.titleQuiz');
const DOMtimerText = document.getElementById('timerText');
const DOMtimerNumber = document.getElementById('timerNumber');
const DOMquestion = document.getElementById('question');
const DOMscore = document.getElementById('score');
const DOMcount = document.getElementById('count');
const DOMoption_1 = document.getElementById('0');
const DOMoption_2 = document.getElementById('1');
const DOMoption_3 = document.getElementById('2');
const DOMoption_4 = document.getElementById('3');
const DOMbtnClose = document.getElementById('clouse_quiz').addEventListener('click', close = () => {
    location.assign('./quiz_game.html');
});

/* Despliegue de las Reglas del Juego */
const DOMrules = document.getElementById('rules').innerHTML =
    `<div class="p_rules_game text-center p-3 bg-light rounded  container col-xxl-5 col-xl-6 col-lg-7" style="--bs-bg-opacity: .3;">
                                                                    <img src="../img/headers_games/header_quiz.png" class="container mb-3" alt="">
                                                                    <p><i class="bi bi-check-square-fill me-3"></i>DISPONES DE 15 SEGUNDOS POR PREGUNTA PARA RESPONDER</p>
                                                                    <p><i class="bi bi-check-square-fill me-3"></i>PASADO LOS 15 SEGUNDOS Y NO SE SELECCIONO UNA RESPUESTA, ESTA SE MARCARA COMO INCORRECTA</p>
                                                                    <p><i class="bi bi-check-square-fill me-3"></i>AL FINALIZAR EL JUEGO, NO TENDRAS POSIBILIDAD DE VER LA RESPUESTA CORRECTA</p>
                                                                    <p><i class="bi bi-check-square-fill me-3"></i>SI ESTAS PREPARADO/A PULSA JUGAR Y VAMOS A ELEGIR LA TEMÁTICA</p>
                                                                    <button class="goGame btn btn-danger px-5 shadow">JUGAR!</button>
                                                                </div>`;

/* Boton para avanzar a las tematicas para jugar */
document.addEventListener('click', ((e) => { if (e.target && e.target.matches('button.goGame')) { initQuiz() } }));
const DOMthemes = document.getElementById('themes').innerHTML =
    `<div class="text-center container">
    <img src="../img/themes_quiz/arte_literatura.jpg" alt="Arte y Literatura" id="3" class="btn_theme" name="arte_y_literatura">
    <img src="../img/themes_quiz/entretenimiento.jpg" alt="Entretenimiento" id="2" class="btn_theme" name="entretenimiento">
    <img src="../img/themes_quiz/geografia.jpg" alt="Geografia" id="4" class="btn_theme" name="geografia">
    <img src="../img/themes_quiz/historia.jpg" alt="Historia" id="0" class="btn_theme" name="historia">
    <img src="../img/themes_quiz/natur_ciencia.jpg" alt="Naturaleza y Ciencia" id="1" class="btn_theme" name="naturaleza_y_ciencia">
</div>`;

/* Funcion para Ocultar las reglas y mostrar las tematicas para comenzar a jugar */
function initQuiz() {
    document.getElementById('rules').classList.toggle('d-none');
    document.getElementById('themes').classList.toggle('d-none');
    document.querySelector('.title').classList.toggle('d-none');
};

const DOMbtnsThemes = document.querySelectorAll('.btn_theme');
DOMbtnsThemes.forEach((btn) => {
    btn.addEventListener('click', choiceTheme);
    btn.addEventListener('click', viewQuiz);
});

/* Funcion mensaje de carga y para ocultar la tematica */
function viewQuiz() {
    let timerInterval;
    Swal.fire({
        title: 'Cargando preguntas...',
        html: 'En <b></b> segundos, comenzamos!!',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = (Swal.getTimerLeft() / 1000)
                    .toFixed(0)
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            DOMviewQuiz = document.querySelector('.view_quiz').setAttribute('class', 'view_active');
            DOMheaderThemes = document.getElementById('themes').setAttribute('class', 'view_desactive');
            document.querySelector('.title').classList.toggle('d-none');
        };
    });
};

/* Funcion para identificar el tema elegido */
function choiceTheme(e) {
    e.stopPropagation();
    switch (e.target.name) {
        case "arte_y_literatura":
            getId(e.target.id); /* Obtengo el id para cargar el titulo de la tematica */
            loadQuestion(indexQuestion, e.target.id); /* Funcion para dirigir la tematica y obtenga las preguntas/opciones */
            break;
        case "entretenimiento":
            getId(e.target.id);
            loadQuestion(indexQuestion, e.target.id);
            break;
        case "geografia":
            getId(e.target.id);
            loadQuestion(indexQuestion, e.target.id);
            break;
        case "historia":
            getId(e.target.id);
            loadQuestion(indexQuestion, e.target.id);
            break;
        case "naturaleza_y_ciencia":
            getId(e.target.id);
            loadQuestion(indexQuestion, e.target.id);
            break;
    };
};

/* Variables del Juego QUIZ */
let timeValue = 15;
let timeRest = timeValue;
let timeScore = 0;
let userScore = 0;
let answerCorrect = 0;
let answerWrong = 0;
let count;
let countLine;
let indexQuestion = 0;
let themesTitle = [
    "Historia", "Naturaleza y Ciencia", "Entretenimiento", "Arte y Literatura", "Geografia"
]

/* Variables para obtener el objeto dentro del array de preguntas */
themes[0] = historia;
themes[1] = naturaleza_y_ciencia;
themes[2] = entretenimiento;
themes[3] = arte_y_literatura;
themes[4] = geografia;

/* Funcion para obtener el id para cargar el titulo de la tematica */
function getId(id) {
    idBtnChoice = id;
    return { idBtnChoice };
};

/* Funcion para dirigir la tematica y obtenga las preguntas/opciones */
function loadQuestion(indexQuestion, i) {
    DOMtitleQuiz.innerHTML = `Quiz de ${themesTitle[i]}`;
    clearInterval(count);
    starTimer(15);
    question = themes[i][indexQuestion];
    for (let i = 0; i < 4; i++) {
        question.options.sort(() => Math.random() - 0.5);
    }
    DOMquestion.innerHTML = `${question.id}<i class="bi bi-caret-right-fill"></i>${question.question}`;
    DOMoption_1.innerHTML = question.options[0];
    DOMoption_2.innerHTML = question.options[1];
    DOMoption_3.innerHTML = question.options[2];
    DOMoption_4.innerHTML = question.options[3];

    DOMcount.innerHTML = `Pregunta ${indexQuestion + 1} de ${themes[i].length}`;
};

/* Eventos de los botones de opciones de respuesta */
const DOMbtnsOptions = document.querySelectorAll('.option').forEach((btn) => {
    btn.addEventListener('click', e => {
        idChoice = e.target.id;
        selectChoice(idChoice, `${idBtnChoice}`);
    });
});

/* Funcion para chequear la respuesta y setear el resultado */
function selectChoice(idChoice, idBtnChoice) {
    clearInterval(count)
    let validate = question.options[idChoice] == question.answer;
    validate == true ? (loadAnswer(true), loadScore(true)) : (loadAnswer(false), loadScore(false));
    indexQuestion++;
    if (indexQuestion >= themes[idBtnChoice].length) {
        DOMshowQuiz.innerHTML = '';
        if (idBtnChoice == "0") {
            if (userScore < users[5].score_historia) { infoResultScore(users[5].score_historia) } else if (users[5].score_historia == 0) { finishQuiz(idBtnChoice) } else { congratulations(idBtnChoice) };
        } else if (idBtnChoice == "1") {
            if (userScore < users[5].score_naturaleza_y_ciencia) { infoResultScore(users[5].score_naturaleza_y_ciencia) } else if (users[5].score_naturaleza_y_ciencia == 0) { finishQuiz(idBtnChoice) } else { congratulations(idBtnChoice) };
        } else if (idBtnChoice == "2") {
            if (userScore < users[5].score_entretenimiento) { infoResultScore(users[5].score_entretenimiento) } else if (users[5].score_entretenimiento == 0) { finishQuiz(idBtnChoice) } else { congratulations(idBtnChoice) };
        } else if (idBtnChoice == "3") {
            if (userScore < users[5].score_arte_y_literatura) { infoResultScore(users[5].score_arte_y_literatura) } else if (users[5].score_arte_y_literatura == 0) { finishQuiz(idBtnChoice) } else { congratulations(idBtnChoice) };
        } else if (idBtnChoice == "4") {
            if (userScore < users[5].score_geografia) { infoResultScore(users[5].score_geografia) } else if (users[5].score_geografia == 0) { finishQuiz(idBtnChoice) } else { congratulations(idBtnChoice) };
        };
    } else {
        DOMcount.innerHTML = `Pregunta ${indexQuestion + 1} de ${themes[idBtnChoice].length}`;
        clearInterval(count);
        starTimer(timeValue);
        loadQuestion(indexQuestion, idBtnChoice);
    };
};

/* Funcion para mostrar la comparacion de resultados anteriores obtenidos con el actual*/
function infoResultScore(LS_score) {
    Swal.fire(
        'Terminaste el Quiz',
        'Tu resultado no supera al anterior guardado, veamos!',
        'success'
    );
    document.querySelector('.boxQuiz').classList.add('d-none');
    document.getElementById('info_score').innerHTML = `
            <div class="d-flex justify-content-center">        
                    <div class="card text-dark bg-light m-2 col-6" style="max-width: 18rem;">
                        <div class="card-header"><img src="../img/icons/icon_thumb_down.png" alt="Pulgar Abajo" class="container"></div>
                        <div class="card-body">
                        <h5 class="card-title text-center">Tu puntaje obtenido🤦‍♂️:</h5>
                        <h3 class="text-center">${userScore} PUNTOS</h3>
                        <p class="card-text text-center">No te preocupes, no vamos a guardar esta puntuacion😉, sabemos que podes mejorarlo😎</p>
                        </div>
                    </div>
                    <div class="card text-dark bg-light m-2 col-6" style="max-width: 18rem;">
                        <div class="card-header"><img src="../img/icons/icon_thumb_up.png" alt="Pulgar Arriba" class="container"></div>
                        <div class="card-body">
                        <h5 class="card-title text-center">Tu ultimo puntaje guardado:</h5>
                        <h3 class="text-center">${LS_score} PUNTOS</h3>
                        <h2 class="text-center">🙌</h2>
                        </div>
                    </div>
            </div>
            <div class="text-center mb-5">
                <button class="btn btn-info btn_shop_cart" type="button">Volver a jugar</button>
                <button class="btn btn-danger btn_shop_cart" type="button">Salir</button>
            </div>
            `;
    document.addEventListener('click', ((e) => {
        if (e.target && e.target.matches('button.btn')) {
            e.target.textContent == "Salir" ? location.assign('./home.html') : location.assign('./quiz_game.html');
        };
    }));
};

/* Funcion muestra mensaje cuando termina el quiz por primera vez */
function finishQuiz(idBtnChoice) {
    Swal.fire({
        title: '<strong>TERMINASTE EL QUIZ!</strong>',
        imageUrl: '../img/icons/icon_win.png',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        html:
            `Tu puntaje obtenido fue de ${userScore} puntos<br>Incorrectas: ${answerWrong}/${themes[idBtnChoice].length}<br>Correctas: ${answerCorrect}/${themes[idBtnChoice].length}`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<a class="links" href="ranking.html">Ver Ranking</a>',
    });
    setScoreLT(idBtnChoice);
    setQuiz();
};

/* Funcion de mensaje al superar un resultado obtenido anteriormente */
function congratulations(idBtnChoice) {
    Swal.fire({
        title: '<strong>Superaste tu puntaje anterior, felicitaciones!</strong>',
        imageUrl: '../img/icons/icon_win.png',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
        html:
            `Tu puntaje obtenido fue de ${userScore} puntos<br>Incorrectas: ${answerWrong}/${themes[idBtnChoice].length}<br>Correctas: ${answerCorrect}/${themes[idBtnChoice].length}`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<a class="links" href="ranking.html">Ver Ranking</a>',
    });
    setScoreLT(idBtnChoice);;
    setQuiz();
};

/* Funcion para ir mostrando imagenes de correcta o incorrecta respuesta */
function loadAnswer(bolean) {
    bolean == true ? (indicator = document.createElement('DIV'), indicator.classList.add('indice', 'true'), DOMscore.appendChild(indicator)) : (indicator = document.createElement('DIV'), indicator.classList.add('indice', 'false'), DOMscore.appendChild(indicator))
};

/* Funcion para ir guardando las respuesta y su puntaje */
function loadScore(dataChoice) {
    (dataChoice == true) ? ((userScore += 10), answerCorrect++) : answerWrong++;
};

/* Funcion para setear los resultados en el LocalStorage segun la tematica que se esta jugando */
function setScoreLT(idBtnChoice) {
    if (idBtnChoice == "0") {
        users[5].score_historia = userScore;
    } else if (idBtnChoice == "1") {
        users[5].score_naturaleza_y_ciencia = userScore;
    } else if (idBtnChoice == "2") {
        users[5].score_entretenimiento = userScore;
    } else if (idBtnChoice == "3") {
        users[5].score_arte_y_literatura = userScore;
    } else if (idBtnChoice == "4") {
        users[5].score_geografia = userScore;
    };
    localStorage.setItem('users', JSON.stringify(users));
};

/* Funcion de timer de tiempo por pregunta */
function starTimer(timeValue) {
    count = setInterval(timer, 1000);
    function timer() {
        DOMtimerNumber.textContent = timeValue;
        timeValue--;
        timeValue < 0 && (clearInterval(count), selectChoice(5, idBtnChoice));
    };
};

/* Funcion para cuando terminas de jugar, setea o salis del juego segun eleccion */
function setQuiz() {
    document.querySelector('.timer').classList.add('d-none');
    document.getElementById('count').setAttribute('class', 'd-none');
    let buttons = document.createElement('DIV');
    buttons.innerHTML = `
    <div class="d-flex mt-2">
        <button class="btn btn-info container m-1" type="button">Volver a jugar</button>
        <button class="btn btn-danger container m-1" type="button">Ir al HOME</button>
    </div>`
    document.querySelector('.boxQuiz').append(buttons)
    document.getElementById('clouse_quiz').classList.add('d-none');
    document.addEventListener('click', ((e) => {
        if (e.target && e.target.matches('button.btn')) {
            e.target.textContent == "Ir al HOME" ? location.assign('home.html') : location.assign('./quiz_game.html');
        };
    }));
};