import { Serie } from "./serieClass.js";
import { generarToken } from "./token.js";
import { validarGenero, validarTextos, validarURL } from "./validaciones.js"

// traemos los elementos del html
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let imagen = document.querySelector("#imagen");
let genero = document.querySelector("#genero");
let formulario = document.querySelector("#formSerie");
let btnCrearSerie = document.querySelector("#btnCrearSerie");
let token = [];

// variable para manejar el create y update
let serieEditable = false; //si es false la serie es nueva y si es true debe modificar

// agregamos las validaciones
titulo.addEventListener('blur',()=>{validarTextos(titulo,2,30)});
descripcion.addEventListener('blur',()=>{validarTextos(descripcion,10,200)});
imagen.addEventListener('blur',()=>{validarURL(imagen)});
genero.addEventListener('change',()=>{validarGenero(genero)});


const modalAdminSerie = new bootstrap.Modal(document.querySelector('#modalSerie'));

// si hay algo en local storage traer los datos, si no hay nada listaSeries tiene que ser una []
let listasSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || []; //con JSON.parse el formato legible para js

formulario.addEventListener('submit',guardarSerie);

function guardarSerie(e){
    e.preventDefault();
    if(serieEditable){
        // aqui se modifica
        guardarEdicionSerie();
        
    } else {
        // aqui se crea
        crearSerie();
    }
    
}

btnCrearSerie.addEventListener('click', ()=>{
    // limpiamos el formulario
    limpiarFormulario();
    
    // Ponemos el token generado
    generarToken(token,8);
    codigo.value = token[token.length-1];
    codigo.disabled = true;
    
    // mostramos la ventana modal
    modalAdminSerie.show();
    
    //ponemos la obcion de que sea creable y no editable
    serieEditable = false; 
}); //abrimos ventana modal

// verificar si hay datos para dibujar la tabla
cargaInicial();
console.log(token);

function crearSerie(){
    console.log("Desde crear serie");
    
    // volver a validar y si son correctos crear la nueva serie
    if(validarTextos(titulo,2,30) && validarTextos(descripcion,10,200) && validarURL(imagen) && validarGenero(genero)){
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
    } else {
        // cerrar modal que administra series
        modalAdminSerie.hide();
        
        // mostrar mensaje
        Swal.fire(
        'Serie no creada!',
        'La serie cargada no se creo correctamente',
        'error'
        );
    }
}

function limpiarFormulario(){
    formulario.reset();
    // si usamos is-valid o is-invalid hay que reseterlas
    titulo.className = 'form-control';
    descripcion.className = 'form-control';
    imagen.className = 'form-control';
    genero.className = 'form-control';
}

function guardarListaSeries(){
    localStorage.setItem('listaSeriesKey',JSON.stringify(listasSeries)); //JSON.stringify convierte en formato JSON
}

function cargaInicial(){
    if(listasSeries.length > 0){
        // dibujar la tabla
        listasSeries.forEach((itemSerie)=>{   //con el forEach le ponemos un nombre (aca) y ese representa a cada uno de los elementos del arreglo
            crearFila(itemSerie);
            token.push(itemSerie.codigo); //cargamos el los tokens en el arreglo
        });
    }
}

function crearFila(itemSerie){
    let tablaSeries = document.querySelector("#listaSeries");
    tablaSeries.innerHTML += `
    <tr>
        <th scope="row">${itemSerie.codigo}</th>
        <td>${itemSerie.titulo}</td>
        <td>
            <div class = 'textOverflow'>
                ${itemSerie.descripcion}
            <div>
        </td>
        <td>${itemSerie.imagen}</td>
        <td>${itemSerie.genero}</td>
        <td>
            <button class="btn btn-warning" onclick="prepararEdicionSeries('${itemSerie.codigo}')"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger" onclick="borrarProducto('${itemSerie.codigo}')"><i class="bi bi-x-square"></i></button>
        </td>
    </tr>
    `;
}

//De esta forma podemos poner funciones del codigo html teninedo js de tipo modulo
window.borrarProducto = function(codigo){
    // console.log("desdes borrar producto" + codigo);
    
    // Preguntar al usuario si estoy seguro de borrar
    Swal.fire({
        title: 'Esta seguro de eliminar la serie?',
        text: "No puedes revertir este paso, luego de aceptar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            // Borrar la serie listaSeries y de localStorage
            let listaSeriesNueva = listasSeries.filter ((serie)=> {return serie.codigo !== codigo}); //serie.codigo es una propiedad. Filtramos creando un numero arreglo con las series menos la que queremos
            listasSeries = listaSeriesNueva;
            guardarListaSeries();
            console.log(listaSeriesNueva);
            
            // Actualizar tabla
            borrarTabla();
            cargaInicial();
            
            // mostrar cartel de operacion
            Swal.fire(
                'Serie eliminada!',
                'La serie seleccionada fue correctamente eliminada',
                'success'
            )
        }
    })
    
}

function borrarTabla(){
    let tbodySeries = document.getElementById("listaSeries");
    tbodySeries.innerHTML = ''; //borramos la tabla
}

window.prepararEdicionSeries = function (codigoP){
    // cargar los datos de la serie a editar
    let serieBuscada = listasSeries.find((serie)=>{return serie.codigo === codigoP}) //Devuelve el objeto que estoy buscando
    console.log(serieBuscada);
    
    // asignar los valores a cada input
    codigo.value = serieBuscada.codigo;
    titulo.value = serieBuscada.titulo;
    descripcion.value = serieBuscada.descripcion;
    imagen.value = serieBuscada.imagen;
    genero.value = serieBuscada.genero;
    
    // mostrar el formulario
    modalAdminSerie.show();
    
    // modifico la variable para editar
    serieEditable = true;
}

function guardarEdicionSerie(){
    // nescesitamos la posicion de la serie dentro del arreglo
    let posicionSerie = listasSeries.findIndex((serie)=>{return serie.codigo === codigo.value})
    console.log(posicionSerie);
    
    // modificamos los valores de la serie encontrada
    listasSeries[posicionSerie].titulo = titulo.value;
    listasSeries[posicionSerie].descripcion = descripcion.value;
    listasSeries[posicionSerie].imagen = imagen.value;
    listasSeries[posicionSerie].genero = genero.value;
    
    // actualizar el localStorage
    guardarListaSeries();
    
    // actualizar la tabla
    borrarTabla();
    cargaInicial();
    
    // mostrar que la serie fue modificada
    Swal.fire(
        'Serie modificada!',
        'La serie se modifico correctamente',
        'success'
        );
        
    // cerrar ventana modal
    modalAdminSerie.hide();
}