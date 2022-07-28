/* Despliegue del formulario HTML */
const DOMform_contact = document.querySelector('.form_contact').innerHTML = `
                                                            <div class="text-center"><img src="../img/title_section/header_contact.png" class="mt-2" alt="Titulo Contacto"></div>
                                                            <form id="form" class="row">
                                                                    <div class="mb-3">
                                                                        <div id="validate_name">
                                                                            <label class="form-label mt-2 mb-1">Tu nombre completo</label>
                                                                            <input type="name" class="inputs form-control" name="name" id="name" placeholder="Nombre y Apellido" required>
                                                                            <div class="mt-1 msg_error bg-danger text-light p-1">Solo carácteres Alfabeticos de la A a Z (Minusculas y Mayusculas) Max: 30 caracteres</div>
                                                                        </div>
                                                                        <div id="validate_email">
                                                                            <label class="form-label mt-2 mb-1">Correo Electronico</label>
                                                                            <input type="email" class="inputs form-control" name="email" id="email" placeholder="nombre@ejemplo.com">
                                                                            <div class="mt-1 msg_error bg-danger text-light p-1">El correo solo puede contener letras, numeros, puntos, guiones y guion bajo, incluido el @</div>
                                                                        </div>
                                                                        <div id="validate_message">
                                                                            <label class="form-label mt-2 mb-1">Mensaje</label>
                                                                            <textarea class="inputs form-control" name="message" id="message" placeholder="Tu consulta aqui" rows="3"></textarea>
                                                                            <div class="mt-1 msg_error bg-danger text-light p-1">Minimo 50 carácteres y no se aceptan carácteres especiales</div>
                                                                        </div>
                                                                        <div id="validate_submit">  
                                                                            <input class="submit_form btn btn-dark mt-3 container shadow" id="send" type="submit" value="Enviar">
                                                                            <div class="mt-1 msg_error bg-danger text-light text-center p-1"><i class="bi bi-exclamation-triangle-fill"></i> Error: Todos los campos son Requeridos!</div>
                                                                        </div>
                                                                    </div>
                                                            </form>
                                                                `;

/* Expresiones regulares para validacion del formulario */
const expReg = { user: /^[a-zA-ZÀ-ÿ\s]{1,30}$/, email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, message: /^[^$%&|<>#]{50,1000}$/ };
const inputs = { name: false, email: false, message: false };

/* Funcion para validar el formulario */
function validateForm(e) {
    e.stopPropagation();
    switch (e.target.name) {
        case "name":
            validateInputs(expReg.user, e.target, 'name');
            break;
        case "email":
            validateInputs(expReg.email, e.target, 'email');
            break;
        case "message":
            validateInputs(expReg.message, e.target, 'message');
            break;
    };
};

/* Funcion para validar los inputs ingresados */
function validateInputs(expression, input, field) {
    if (expression.test(input.value)) {
        document.querySelector(`#validate_${field} .msg_error`).classList.remove('msg_error_active');
        inputs[field] = true;
    } else {
        document.querySelector(`#validate_${field} .msg_error`).classList.add('msg_error_active');
        inputs[field] = false;
    };
};

/* Eventos de los inputs para la validacion y mensaje de error */
const DOMinputs = document.querySelectorAll('.inputs');
DOMinputs.forEach((inputs) => {
    inputs.addEventListener('keyup', validateForm);
    inputs.addEventListener('blur', validateForm);
});

/* Evento boton Enviar y validacion por medio de la api EMAILJS */
document.querySelector('.submit_form').addEventListener('click', ((e) => {
    e.stopPropagation();
    if (inputs.name && inputs.email && inputs.message) {
        btn = document.getElementById('send');
        document.getElementById('form').addEventListener('submit', function (event) {
            event.preventDefault();
            btn.value = 'Enviando Mensaje...';
            const serviceID = 'default_service';
            const templateID = 'template_5tgkwl9';
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar';
                    form.reset();
                    Swal.fire(
                        'Mensaje Enviado',
                        'Pronto estaremos poniendos en contacto',
                        'success'
                    )
                }, (err) => {
                    btn.value = 'Enviar';
                    form.reset()
                    Swal.fire(
                        'Mensaje NO enviado!',
                        'Disculpe las molestias, vuelvalo a intentar mas tarde',
                        'error'
                    )
                });
        });
    } else {
        document.querySelector(`#validate_submit .msg_error`).classList.add('msg_error_active');
        setTimeout(() => {
            document.querySelector(`#validate_submit .msg_error`).classList.remove('msg_error_active');
        }, 3000);
    }
}));
