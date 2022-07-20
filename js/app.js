// verificar si hay algo en el localStorage
let listaSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || [];

// si hay datos dibujar la cards
listaSeries.forEach((serie)=>{
    crearColumna(serie);
});

function crearColumna(serie){
    let grillaSerie = document.querySelector("#grillaSerie");
    
    grillaSerie.innerHTML += `
        <article class="col-12 col-md-4 col-lg-3 mb-3">
            <div class="card">
                <img src="${serie.imagen}" class="card-img-top" alt="${serie.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${serie.titulo}</h5>
                    <button class="btn btn-primary" onclick="verDetalle('${serie.codigo}')" >ver detalle</button>
                </div>
            </div>
        </article>
    `;
}

window.verDetalle = (codigo) =>{
    console.log(codigo);
    console.log(window.location.origin+`/pages/detalle.html?codigo=${(codigo)}`);  //el location nos muestra la direccion donde esta la pagina y con el ? pasamos parametros
    window.location.href = window.location.origin+`/pages/detalle.html?codigo=${(codigo)}`;
}