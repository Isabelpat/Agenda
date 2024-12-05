//variable
//let Isabel;
//console.log(nombre);
//nombre = "Isabel";

//console.log("Hola mundo");
//alert("hola desde un alert");
//tipo de datos
//string
//let texto = "soy texto";
//number
//let numero = 42;
//bolean, true, false, si, no, on, of
//let verdadero = true;
//undefined
//let undefined;
//null
//let vacio = null;
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-record-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST = [];
let id = 0;

// Mostrar la fecha
const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
});

// Funciones
function agregarTarea(tarea, id, hecho, eliminar) {
    if (eliminar) {
        return;
    }
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = `
        <li id="elemento">
            <i id="${id}" data="hecho" class="bi ${realizado}"></i>
            <p class="tarea-lista ${LINE}">${tarea}</p>
            <i id="${id}" data="eliminar" class="bi bi-trash"></i>
        </li>`;
    lista.insertAdjacentHTML("beforeend", elemento); // Cambio insertAdjacentElement por insertAdjacentHTML
}

function tareaRealizada(element) {
    element.classList.toggle(check); // Cambio classlist por classList
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.tarea-lista').classList.toggle(tachado); // Aseguramos que la clase coincida
    LIST[element.id].hecho = !LIST[element.id].hecho;
}

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
}

// Eventos
botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});

lista.addEventListener("click", function (event) { // Corrijo "clik" por "click"
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData === "hecho") {
        tareaRealizada(element);
    } else if (elementData === "eliminar") {
        tareaEliminada(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Recuperar datos de localStorage
let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
}

function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
    });
}

