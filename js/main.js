let cart = JSON.parse(localStorage.getItem('cart')) || [];  /* LocalStorage Carrito de Compras */
let users = JSON.parse(localStorage.getItem('users')) || []; /* LocalStorage Usuarios */

/* Despliegue del formulario de ingreso */
const DOMlogin = document.getElementById('domLogin');
DOMlogin.innerHTML = `
        <div class="row align-items-stretch">
            <div class="col bgHome_left d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
                <div class="col bgHome_right p-5 rounded-end">
                    <div class="text-end">
                        <img src="./img/logomenu.png" width="300" alt=""> 
                    </div>
                <h2 class="fw-bold text-center py-4">BIENVENIDO</h2>
                <form>
                    <div id="validate_name" class="mb-4">
                        <label for="user" class="form-label">Ingresa tu nombre</label>
                        <input type="user" class="form-control" name="user" id="name">
                        <div class="msg_error">El usuario tiene que ser de 4 a 16 digitos y solo puede contener numeros, letras y guion bajo</div>
                    </div>
                    <div id="validate_email" class="mb-4">
                        <label for="email" class="form-label">Correo Electronico</label>
                        <input type="email" class="form-control" name="email" id="email">
                        <div class="msg_error">El correo solo puede contener letras, numeros, puntos, guiones y guion bajo, incluido el @</div>
                    </div>
                </form>
                <div id="validate_submit" class="d-grid">
                    <button type="button" id="getInfo" class="btn btn-info">A jugar!</button>
                    <div class="msg_error mt-3 text-center"><span class="bg-danger p-2 rounded"><i class="bi bi-exclamation-triangle-fill"></i> Error: Todos los campos son Requeridos!</span></div>
                </div>

            </div>
        </div>
`;

/* Chequear si ya ingreso */
userRegister()

/* Funcion para chequear si el usuario ya se logeo o quiere entrar con otro nombre */
function userRegister() {
    if (localStorage.getItem('users') != null) {
        Swal.fire({
            title: `¿Continuar la sesión de ${users[5].name}?`,
            html: `<h6 class="text-danger">Al ingresar un NUEVO usuario, se perderan todos los datos guardados de ${users[5].name}</h6>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, continuar con la sesión',
            cancelButtonText: 'No, ingresar nuevo usuario',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) { location.href = "../pages/home.html" } else { localStorage.clear('users'), location.assign('./index.html') }
        });
    };
};

/* Expresiones regulares para validacion de formulario */
const expReg = { user: /^[a-zA-Z0-9\_\-]{4,16}$/, email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, };
const inputs = { name: false, email: false, };

const DOMgetInfo = document.getElementById('getInfo').addEventListener('click', setUser);
const DOMinputs = document.querySelectorAll('input');

/* Funcion para validar el formulario */
function validateForm(e) {
    e.stopPropagation();
    switch (e.target.name) {
        case "user":
            validateInputs(expReg.user, e.target, 'name');
            break;
        case "email":
            validateInputs(expReg.email, e.target, 'email');
            break;
    };
};

/* Funcion para validar los inputs ingresados */
function validateInputs(expression, input, field) {
    if (expression.test(input.value)) {
        document.getElementById(`validate_${field}`).classList.remove('validate_error');
        document.getElementById(`validate_${field}`).classList.add('validate_confirm');
        document.querySelector(`#validate_${field} .msg_error`).classList.remove('msg_error_active');
        inputs[field] = true;
    } else {
        document.getElementById(`validate_${field}`).classList.add('validate_error');
        document.getElementById(`validate_${field}`).classList.remove('validate_confirm');
        document.querySelector(`#validate_${field} .msg_error`).classList.add('msg_error_active');
        inputs[field] = false;
    };
};

/* Eventos de los inputs para la validacion */
DOMinputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

/* Constructor de Usuarios */
class GetUser {
    constructor(name, email, scoreAll, score_arte_y_literatura, score_entretenimiento, score_geografia, score_historia, score_naturaleza_y_ciencia) {
        this.name = name;
        this.email = email;
        this.scoreAll = scoreAll;
        this.score_arte_y_literatura = score_arte_y_literatura;
        this.score_entretenimiento = score_entretenimiento;
        this.score_geografia = score_geografia;
        this.score_historia = score_historia;
        this.score_naturaleza_y_ciencia = score_naturaleza_y_ciencia;
    };
};

/* Funcion para cargar todos los datos del usuario al LocalStorage */
function setUser() {
    if (inputs.name && inputs.email) {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let scoreAll = 0;
        let score_arte_y_literatura = 0;
        let score_entretenimiento = 0;
        let score_geografia = 0;
        let score_historia = 0;
        let score_naturaleza_y_ciencia = 0;
        let user = new GetUser(name, email, scoreAll, score_arte_y_literatura, score_entretenimiento, score_geografia, score_historia, score_naturaleza_y_ciencia);
        loadBotsRanking();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        welcomeTo(name);
    } else {
        document.querySelector(`#validate_submit .msg_error`).classList.add('msg_error_active');
        setTimeout(() => {
            document.querySelector(`#validate_submit .msg_error`).classList.remove('msg_error_active');
        }, 3000);
    };
};

/* Mensaje de Bienvenido al Sitio y redireccionamiento */
function welcomeTo(name) {
    Swal.fire({
        title: `Bienvenido ${name}`,
        showClass: {
            popup: 'animate__animated animate__flipInX'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutRightBig'
        },
        html: 'Ingresando en <b></b> segundos',
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
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            setTimeout(() => {
                window.location.replace("pages/home.html");
            }, 500);
        };
    });
};

/* Funcion para cargar Bots para relleno del Ranking de Resultados */
function loadBotsRanking() {
    let bot = new GetUser("CrackQuiz", "unocualquiera@hotmail.com", 0, 80, 60, 70, 50, 90);
    let bot1 = new GetUser("TerminatorQuiz", "probando@hotmail.com", 0, 90, 60, 50, 70, 80);
    let bot2 = new GetUser("Maria_Antonieta", "marianto@hotmail.com", 0, 30, 50, 40, 50, 20);
    let bot3 = new GetUser("Roberto_Manfredi", "robertoman@hotmail.com", 0, 40, 10, 20, 70, 20);
    let bot4 = new GetUser("NicolasPalermo", "parnico@hotmail.com", 0, 30, 80, 50, 60, 70);
    users.push(bot, bot1, bot2, bot3, bot4);
};