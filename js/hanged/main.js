/* Array de palabras para adivinar */
const words = ['alias', 'arrestar', 'explosion', 'rompecabezas', 'brillar', 'australiano', 'naturalista', 'cuchara', 'parametros', 'nativo', 'ladron', 'retirar', 'escondida', 'television', 'javascript', 'html', 'respirar', 'choque', 'resonancia', 'trozos', 'rehenes', 'medico', 'cadena', 'pastel', 'zorro', 'cuadro', 'astronomia', 'mineros', 'estatua', 'conejo', 'paquete', 'malestar', 'natacion', 'excepcional', 'emperador', 'rapero', 'educativo', 'guionista', 'motocicleta', 'gusano', 'lastimar', 'inmune', 'covid', 'maestro']
/* Array para generar los botones de las letras */
const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let wordRandom;
let letter_corrects = 0;
let letter_wrongs = 0;
const DOMgame_hanged = getId('game_hanged');
const DOMletters = getId('letters');
const DOMhanged_img = getId('hanged_img');
const DOMplay_game = getId('play_game');
DOMplay_game.addEventListener('click', initHanged);

/* Generador de los botones de las letras */
for (btns of abc) {
    const btn = `
    <button class="btn btn-light">${btns}</button>
    `;
    DOMletters.innerHTML += btn;
};

const DOMbtn_letters = document.querySelectorAll('#letters button');

/* Funcion para obtener una palabra aleatoria */
function getRandom(num_min, num_max) {
    const values = num_max - num_min;
    const wordsRandom = (Math.floor(Math.random() * values)) + num_min;
    return wordsRandom;
};

/* Funcion para dar inicio al juego */
function initHanged() {
    DOMhanged_img.src = `../img/hanged/0.png`;
    DOMplay_game.disabled = true;
    letter_corrects = 0;
    letter_wrongs = 0;
    const word_guess = getId('letter_guess');
    word_guess.innerHTML = '';
    const quantity_words = words.length;
    const valuesRandom = getRandom(0, quantity_words);
    wordRandom = words[valuesRandom].toUpperCase();
    const quantity_span = wordRandom.length;
    for (let i = 0; i < DOMbtn_letters.length; i++) {
        DOMbtn_letters[i].disabled = false;
        DOMbtn_letters[i].classList.remove('letter_wrong', 'letter_correct');
    };
    for (let i = 0; i < quantity_span; i++) {
        const span = document.createElement('span');
        span.setAttribute('class', 'spanHanged')
        word_guess.appendChild(span);
    };
};

/* Eventos en los botones de las letras */
document.addEventListener('click', ((e) => {
    if (e.target && e.target.matches('#letters button')) {
        const spans = document.querySelectorAll('#letter_guess span');
        const btn_letter = e.target
        btn_letter.disabled = true;
        const letter = btn_letter.textContent;
        let hits = false;
        for (let i = 0; i < wordRandom.length; i++) {
            if (letter == wordRandom[i]) {
                spans[i].innerHTML = letter;
                letter_corrects++;
                hits = true;
                btn_letter.classList.add('letter_correct');
            };
        };
        if (hits == false) {
            letter_wrongs++;
            const img_hanged = `../img/hanged/${letter_wrongs}.png`;
            DOMhanged_img.src = img_hanged;
            btn_letter.classList.add('letter_wrong');
        };
        letter_wrongs == 7 && msjLooser();
        letter_corrects == wordRandom.length && msjWin();
    };
}));

/* Funcion mensaje perdiste */
function msjLooser() {
    Swal.fire({
        title: 'PERDISTE!',
        html: `La palabra era ${wordRandom}`,
        width: 600,
        padding: '3em',
        color: '#716add',
    });
    DOMplay_game.textContent = 'VOLVER A JUGAR!';
    gameOver();
};

/* Funcion mensaje Ganador */
function msjWin() {
    Swal.fire({
        title: 'GANASTE!',
        width: 600,
        padding: '3em',
        color: '#716add',
        backdrop: `
            rgba(0,0,123,0.4)
            url("../img/raining_win.gif")
            left top
            repeat
        `
    });
    DOMplay_game.textContent = 'VOLVER A JUGAR!';
    gameOver();
};

/* Funcion cuando termina el juego bloquea todo */
function gameOver() {
    for (let i = 0; i < DOMbtn_letters.length; i++) {
        DOMbtn_letters[i].disabled = true;
    };
    DOMplay_game.disabled = false;
};

/* Inicia todo bloqueado hasta que empieze a jugar */
gameOver();

