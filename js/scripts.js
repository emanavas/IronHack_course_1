//importamos la función de los parciales y la ejecutamos
import { cargarpartials } from "./partials.js";
cargarpartials();

//

let pagina = window.location.pathname.split("/").pop(); //obtenemos el nombre del archivo html
if (pagina == "cbasicos.html") {
    //hacemos una comprobación para que solo afecte a la página que queremos
    document.getElementById("intro").innerHTML =
        "Este texto ha sido cambiado con Js. Archivo script.js";

    //Añadimos un escuchador de eventos a un elemento html
    document.getElementById("color").addEventListener("click", cambiarColor);
}

function cambiarTexto() {
    document.getElementById("intro").innerHTML =
        "Este texto ha sido cambiado con Js. En este caso hemos utilizado una función de script.js";
}

//Hacemos global la función para poder ser llamada desde html
window.cambiarTexto = cambiarTexto;

function cambiarColor() {
    document.getElementById("intro").style.color = "rgb(250, 104, 0)";
}

function abrirModal() {
    document.getElementById("miModal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("miModal").style.display = "none";
}

function accionSi() {
    console.log("El usuario eligió: Seguir adelante");
    cerrarModal();
}

window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.accionSi = accionSi;
