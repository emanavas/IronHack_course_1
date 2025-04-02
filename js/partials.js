

function getFilesInFolder(url, folderPath , filter = ".html") {

    const result = fetch(url+folderPath)
        .then((response) =>{ 
            return response.text()
        })
        .then(data => {                
            let el = document.createElement('html');
            el.innerHTML = data;

            //let list = el.children[1].childNodes[3].childNodes[1].childNodes[3].childNodes[2].childNodes[0].href;
            let list = el.querySelector("#files")
            let arr = [];
            for (let i = 1; i < list.children.length; i++) {
                const res = list.children[i][0].innerHTML;
                if( res.endsWith(filter)){
                    arr.push( folderPath+res ) ;
                } 
            }
            return arr;
        })
    return result
}

function generateMenu(elementList, stringTag) {
    let menu = '';
    for (let i = 0; i < elementList.length; i++) {
        const element = elementList[i];
        menu += `<${stringTag}><a href="${element}">${stringTag}</a></${stringTag}>`;
    }
    return menu;
}

function load_into_class (class_name, url) {
    console.log("Cargando " + url);
    //función local
    fetch(url) //hace una petición para obtener un arvivo
        .then((response) => response.text()) //convierte la respuesta a texto
        .then((data) => (document.getElementsByClassName(class_name).innerHTML = data))
        .then((data) => console.log(data)) //inserta el texto en el contenedor
        .catch((error) => console.error(`Error al cargar ${url}:`, error)); //manejo de errores
}

function load_into_id (id, url) {
    //función local
    fetch(url) //hace una petición para obtener un arvivo
        .then((response) => response.text()) //convierte la respuesta a texto
        .then((data) => (document.getElementById(id).innerHTML = data)) //inserta el texto en el contenedor
        .catch((error) => console.error(`Error al cargar ${url}:`, error)); //manejo de errores
}

function load_main_navbar (){
    Partial.load_into_id("navbar_content", "/partials/nav_main.html");
}

function generate_script_pages() {
    getFilesInFolder("http://127.0.0.1:5500/", "/pages/js_labs/").then((res_list) => {
        console.log(res_list)
    });
}

window.load_into_class = load_into_class;
window.load_into_id = load_into_id;
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
