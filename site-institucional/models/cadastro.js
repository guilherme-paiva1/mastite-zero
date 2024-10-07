function cadastrar(){
    var empresa =  inputEmpresa.value 
    var responsavel = inputResponsavel.value 
    var cnpj = inputCnpj.value 
    var email = inputEmail.value
    var senha = inputSenha.value
    var confirmarSenha = inputConfirmaSenha.value

    spanErroSenha.innerHTML = "";
    spanErroConfirmarSenha.innerHTML = "";
    spanErroEmail.innerHTML = "";
    spanErroResponsavel.innerHTML = "";
    spanErroCnpj.innerHTML = "";
    spanErroEmpresa.innerHTML = "";
    divMensagem.innerHTML = "";
    inputEmpresa.style = "";
    inputResponsavel.style = "";
    inputCnpj.style = "";
    inputEmail.style = "";
    inputSenha.style = "";
    inputConfirmaSenha.style = "";




    if(senha != confirmarSenha){
        spanErroSenha.innerHTML = "As senhas não são identicas"
        spanErroConfirmarSenha.innerHTML = "As senhas não são identicas"
        inputSenha.style.border = "solid 1px red";
        inputConfirmaSenha.style.border = "solid 1px red";

    }else if(senha == 0 || senha < 4){
        spanErroSenha.innerHTML = "Senha inválida, curta demais"
        spanErroConfirmarSenha.innerHTML = "Senha inválida, curta demais"
        inputSenha.style.border = "solid 1px red";
        inputConfirmaSenha.style.border = "solid 1px red";

    }else if((email == 0 || email < 7) || email.indexOf("@") < 0 || email.indexOf(".com") < 0){
        inputEmail.style.border = "solid 1px red";
        spanErroEmail.innerHTML = "Email inválido"

    }else if(responsavel == 0 || responsavel < 4){
        spanErroResponsavel.innerHTML = "Responsável inválido"
    }else if(empresa == 0){
        spanErroEmpresa.innerHTML = "Empresa inválida"
    }else {
        divMensagem.innerHTML = `Cadastro realizado com sucesso! Bem-vindo ${empresa}`
    }
}

function validar(){

    var empresa =  inputEmpresa.value 
    var responsavel = inputResponsavel.value 
    var cnpj = inputCnpj.value 
    var email = inputEmail.value
    var senha = inputSenha.value
    var confirmarSenha = inputConfirmaSenha.value

    console.log(cnpj.length)

    if(cnpj.length < 14 || cnpj.length > 14){
        inputCnpj.style.border = "solid 1px red";
        spanErroCnpj.innerHTML = "CNPJ inválido! O CNPJ precisa ter 14 dígitos"
    }else{
        inputCnpj.style.border = "none";
        spanErroCnpj.innerHTML = ""

    }

}

function validarEmail(){
    var email = inputEmail.value

    if((email == 0 || email < 7) || email.indexOf("@") < 0 || email.indexOf(".com") < 0){
        inputEmail.style.border = "solid 1px red";
        spanErroEmail.innerHTML = "Email inválido!";
    }else{
        inputEmail.style.border = "";
        spanErroEmail.innerHTML = "";
    }

}

function validarSenha(){
    var senha = inputSenha.value
    var confirmarSenha = inputConfirmaSenha.value   

    if(senha != confirmarSenha){
        spanErroSenha.innerHTML = "As senhas não são identicas"
        spanErroConfirmarSenha.innerHTML = "As senhas não são identicas"
        inputSenha.style.border = "solid 1px red";
        inputConfirmaSenha.style.border = "solid 1px red";

    }else if(senha == 0 || senha < 4){
        spanErroSenha.innerHTML = "Senha inválida, curta demais"
        spanErroConfirmarSenha.innerHTML = "Senha inválida, curta demais"
        inputSenha.style.border = "solid 1px red";
        inputConfirmaSenha.style.border = "solid 1px red";

    } else {
        inputSenha.style.border = "";
        inputConfirmaSenha.style.border = "";
        spanErroSenha.innerHTML = "";
        spanErroConfirmarSenha.innerHTML = "";
    }

}