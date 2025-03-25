//declaración de variables y constantes
const Nombre = "Javier"; //constante tipo string. Debe inicializarse en su creación
let edad = 20; //variable tipo number
let altura; //variable tipo undefined
let coche = null; //variable tipo null
let esMayorDeEdad = true; //variable tipo boolean
let variable1, variable2, variable3; //creamos 3 variables sin inicializar

edad = edad + 1;
console.log(edad); //21
Nombre = Nombre + " Garcia";
console.log(Nombre); // Javier Garcia. Hemos concatenado la variable Nombre con la cadena " Garcia"

//arrays y objetos
let alumnos = ["Javier", "Paco", "Luis"]; //array de strings
console.log(alumnos[1]); //Paco

let profesor = {
    //objeto
    nombre: "Javier",
    edad: 20,
    altura: 1.8,
    coche: null,
    esMayorDeEdad: true,
    alumnos: ["Olga", "Juan", "Fran"],
};
console.log(profesor.alumnos[1]); //Juan

let profesores = [
    {
        //array de objetos
        nombre: "Javier",
        edad: 20,
        altura: 1.8,
        coche: null,
        esMayorDeEdad: true,
        alumnos: ["Fernando", "María", "Marta"],
    },
    {
        nombre: "Paco",
        edad: 20,
        altura: 1.8,
        coche: null,
        esMayorDeEdad: true,
        alumnos: ["Antonio", "Sandra", "Ana"],
    },
];
console.log(profesores[1].alumnos[0]); //Antonio
