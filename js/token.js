// Codigo que genera token alfanumerico
let token=[];

// Funcion que genera una cadena alfanumerica
function  generarCadenaAlfanumerica (num) {
    const caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado= ' ';
    const cantidadCaracteres = caracteres.length;
    for ( let i = 0; i < num; i++ ) {
        resultado += caracteres.charAt(Math.floor(Math.random() * cantidadCaracteres));
    }
    return resultado;
}

// Funcion que al llamarla cada vez, me genera un token distinto al anterior en el arreglo que le enviemos
export function generarToken(arreglo,cantidadCaracteres){
    arreglo.push(generarCadenaAlfanumerica(cantidadCaracteres));
    for (let i = 0; i < arreglo.length; i++) {
        while(arreglo[i]===arreglo[i-1]){
            arreglo[i] = generarCadenaAlfanumerica(cantidadCaracteres);
        }
    }
}