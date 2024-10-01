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


    if(senha != confirmarSenha){
        spanErroSenha.innerHTML = "As senhas não são identicas"
        spanErroConfirmarSenha.innerHTML = "As senhas não são identicas"
    }else if(senha == 0 || senha < 4){
        spanErroSenha.innerHTML = "Senha inválida, curta de mais"
        spanErroConfirmarSenha.innerHTML = "Senha inválida, curta de mais"
    }else if(email == 0 || email < 7){
        spanErroEmail.innerHTML = "Email inválido"
    }else if(responsavel == 0 || responsavel < 4){
        spanErroResponsavel.innerHTML = "Responsável inválido"
    }else if(empresa == 0){
        spanErroEmpresa.innerHTML = "Empresa inválida"
    }else {
        divMensagem.innerHTML = `BEM VINDO AMIGO ${empresa}`
    }
}