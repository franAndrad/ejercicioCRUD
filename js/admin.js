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

// verificar si hay datos para dibujar la tabla
cargaInicial();

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
    // mostrar mensaje
    Swal.fire(
        'Serie creada!',
        'La serie cargada se creo correctamente',
        'success'
    );
    crearFila(nuevaSerie);
}

function limpiarFormulario(){
    formulario.reset();
    // si usamos is-valid o is-invalid hay que reseterlas
    console.log();
}

function guardarListaSeries(){
    localStorage.setItem('listaSeriesKey',JSON.stringify(listasSeries)); //JSON.stringify convierte en formato JSON
}

function cargaInicial(){
    if(listasSeries.length > 0){
        // dibujar la tabla
        listasSeries.forEach((itemSerie)=>{   //con el forEach le ponemos un nombre (aca) y ese representa a cada uno de los elementos del arreglo
            crearFila(itemSerie);
        });
    }
}

function crearFila(itemSerie){
    let tablaSeries = document.querySelector("#listaSeries");
    tablaSeries.innerHTML += `
    <tr>
        <th scope="row">${itemSerie.codigo}</th>
        <td>${itemSerie.titulo}</td>
        <td>${itemSerie.descripcion}</td>
        <td>${itemSerie.imagen}</td>
        <td>${itemSerie.genero}</td>
        <td>
            <button class="btn btn-warning"><i class="bi bi-x-square"></i></button>
            <button class="btn btn-danger"><i class="bi bi-pencil-square"></i></button>
        </td>
    </tr>
    `;
}