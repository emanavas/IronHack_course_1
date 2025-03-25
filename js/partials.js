import {getFilesInFolder, generateMenu} from "/js/menu_generator.js";

const Partial = {
    load_into_class: function(class_name, url) {
        console.log("Cargando " + url);
        //función local
        fetch(url) //hace una petición para obtener un arvivo
            .then((response) => response.text()) //convierte la respuesta a texto
            .then((data) => (document.getElementsByClassName(class_name).innerHTML = data))
            .then((data) => console.log(data)) //inserta el texto en el contenedor
            .catch((error) => console.error(`Error al cargar ${url}:`, error)); //manejo de errores
    },
    load_into_id: function(id, url) {
        //función local
        fetch(url) //hace una petición para obtener un arvivo
            .then((response) => response.text()) //convierte la respuesta a texto
            .then((data) => (document.getElementById(id).innerHTML = data)) //inserta el texto en el contenedor
            .catch((error) => console.error(`Error al cargar ${url}:`, error)); //manejo de errores
    }
}

function load_main_navbar (){
    Partial.load_into_id("navbar_content", "/partials/nav_main.html");
}

function generate_script_pages() {
    getFilesInFolder("", "/pages/js_labs/").then((res_list) => {
        console.log(res_list)
    });
}

window.load_main_navbar = load_main_navbar;
window.generate_script_pages = generate_script_pages;



/*export function cargarpartials() {
    //función que se exporta
    console.log("Cargando partials");

    document.addEventListener("DOMContentLoaded", function () {
        cargarcomponente("header-container", "/pages/partials/header.html"); //llama a la función para cargar el header
        cargarcomponente("aside-container", "/pages/partials/aside.html");
        cargarcomponente("footer-container", "/pages/partials/footer.html");
    });
}*/
