export function validarTextos(input,minLength,maxLength){
    if(input.value.trim().length >= minLength && input.value.trim().length <= maxLength){
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

export function validarURL(input){
    let expRegular = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if(expRegular.test(input.value.trim())){
        input.className = 'form-control is-valid';
        return true;
    } else {
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarGenero(input){
    if(input.value.trim().length > 0 ){
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}