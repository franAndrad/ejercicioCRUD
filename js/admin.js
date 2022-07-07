import { Serie } from "./serieClass.js";

// traemos los elementos del html
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let imagen = document.querySelector("#imagen");
let genero = document.querySelector("#genero");
let formulario = document.querySelector("#formSerie");
let btnCrearSerie = document.querySelector("#btnCrearSerie")

const modalAdminSerie = new bootstrap.Modal(document.querySelector('#modalSerie'));
console.log(modalAdminSerie);

// si hay algo en local storage traer los datos, si no hay nada listaSeries tiene que ser una []
let listasSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || []; //con JSON.parse el formato legible para js

// agregar validaciones a cada campo

formulario.addEventListener('submit',crearSerie);
btnCrearSerie.addEventListener('click', ()=>{
    limpiarFormulario();
    modalAdminSerie.show();
}); //abrimos ventana modal

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
    // guardar la lista de series en local storage
    guardarListaSeries();
    // cerrar modal que administra series
    modalAdminSerie.hide();
    
}

function limpiarFormulario(){
    formulario.reset();
    // si usamos is-valid o is-invalid hay que reseterlas
    console.log();
}

function guardarListaSeries(){
    localStorage.setItem('listaSeriesKey',JSON.stringify(listasSeries)); //JSON.stringify convierte en formato JSON
}

