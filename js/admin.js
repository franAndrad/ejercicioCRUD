import { Serie } from "./serieClass.js";

// traemos los elementos del html
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let imagen = document.querySelector("#imagen");
let genero = document.querySelector("#genero");
let formulario = document.querySelector("#formSerie");
let listasSeries=[];

// agregar validaciones a cada campo

formulario.addEventListener('submit',crearSerie);

function crearSerie(e){
    e.preventDefault();
    console.log("Desde crear serie");
    // volver a validar y si son correctos crear la nueva serie
    let nuevaSerie = new Serie (codigo.value,titulo.value,descripcion.value,imagen.value,genero.value);
    console.log(nuevaSerie);
    // agregamos una serie al final del arreglo
    listasSeries.push(nuevaSerie);
    console.log(listasSeries);
    // limpiar el formulario
    limpiarFormulario();
}

function limpiarFormulario(){
    formulario.reset();
}
