const formulario = document.getElementById('formulario'); //Acceder al formulario
const inputs = document.querySelectorAll('#formulario input, #formulario select'); //Acceder a todos lo inputs de formulario

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    telefono: /^\d{7,10}$/,
    calle: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/,
    colonia: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/,
    numeroExt: /^\d{1,4}$/,
    problema: /^[a-zA-ZÀ-ÿ0-9\s]{1,100}$/,
    municipio: /^.[a-zA-ZÀ-ÿ0-9\s]{1,20}$/,
    otroMunicipio: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
}

const campos = {
    nombre: false,
    apellido: false,
    telefono: false,
    calle: false,
    colonia: false,
    numeroExt: false,
    problema: false,
    municipio: false,
    otroMunicipio: false
}

function mostrarOtroMunicipio(select) {
    var otroMunicipio = document.getElementById('grupo__otroMunicipio');
    if (select.value === "Otro") {
        otroMunicipio.style.display = 'block';
        campos['otroMunicipio'] = false;
    } else {
        otroMunicipio.style.display = 'none';
        campos['otroMunicipio'] = true;
        document.getElementById('otroMunicipio').value = '';
    }
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;

        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;

        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;

        case "calle":
            validarCampo(expresiones.calle, e.target, 'calle');
            break;

        case "colonia":
            validarCampo(expresiones.colonia, e.target, 'colonia');
            break;

        case "numeroExt":
            validarCampo(expresiones.numeroExt, e.target, 'numeroExt');
            break;

        case "problema":
            validarCampo(expresiones.problema, e.target, 'problema');
            break;

        case "municipio":
            validarCampo(expresiones.municipio, e.target, 'municipio');
            if (e.target.value === "Otro") {
                validarCampo(expresiones.otroMunicipio, document.getElementById('otroMunicipio').target, 'otroMunicipio');
            }
            else{
                campos['otroMunicipio'] = true;
            }
            break;

        case "otroMunicipio":
            validarCampo(expresiones.otroMunicipio, e.target, 'otroMunicipio');
            campos['municipio'] = true;
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
    console.log(campos[campo])
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    $.post('datos.php',
        {
            nombre:$('#nombre').val(),
            apellido:$('#apellido').val(),
            telefono:$('#telefono').val(),
            calle:$('#calle').val(),
            colonia:$('#colonia').val(),
            numeroExt:$('#numeroExt').val(),
            problema:$('#problema').val(),
            municipio:document.getElementById('municipio').value
        },
        function(info){            
            div = document.getElementById('resultado');
            div.style.display = '';
            $('#resultado').html(info);
        
        });
    
    if (campos.nombre && campos.apellido && campos.telefono && campos.calle && campos.colonia && campos.numeroExt && 
        campos.problema && campos.municipio && otroMunicipio) {
            formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    }
    else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 7000);
    }
});
