

function cadastrar(){
    var empresa =  inputEmpresa.value 
    var responsavel = inputResponsavel.value 
    var email = inputEmail.value
    var senha = inputSenha.value
    var confirmarSenha = inputConfirmaSenha.value
    var razao = inputRazao.value;

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
        spanErroEmail.innerHTML = "Email inválido";

    }else if(responsavel == 0 || responsavel < 4){
        spanErroResponsavel.innerHTML = "Representante inválido, mínimo de 4 letras ";
    }else if(empresa == 0 || empresa < 3){
        spanErroEmpresa.innerHTML = "Nome fantasia inválido, mínimo de 3 letras";
    }else if(razao == 0 ||  razao < 3){
        spanErroRazao.innerHTML = "Razão social inválida, mínimo de 3 letras";
    }else {
        divMensagem.innerHTML = `Cadastro realizado com sucesso! Bem-vindo ${empresa}`
    }
}

function validar(){
    var cnpj = inputCnpj.value

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
    var senha = inputSenha.value;
    var possuiEspecial = true;
    var possuiNumero = true;

    for(var i=0; i <= senha.length; i++){   
        if(senha[i] == "@" || senha[i] == "#" || senha[i] == "$" || senha[i] == "%" || senha[i] == "&" || senha[i] == "*"){
            possuiEspecial = false;
        }
        if(senha[i] >= "0" && senha[i] <= "9"){
            possuiNumero = false;
        }
    }

    if(senha == senha.toLowerCase() || possuiEspecial || possuiNumero){
        spanErroSenha.innerHTML = `Senha inválida, não atende os requisitos <br> <b>
                                    (1 caractere especial, 1 letra maiúscula e pelo menos 1 numero) </b>`
        inputSenha.style.border = "solid 1px red";
    }
    
    else if(senha == 0 || senha < 4){
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

function validarCEP() {
    var CEP = inputCEP.value

    console.log(CEP.length)

    if(CEP.length < 8 || CEP.length > 8){
        inputCEP.style.border = "solid 1px red";
        spanErroCEP.innerHTML = "CEP inválido! O CEP precisa ter 8 dígitos"
    }else{
        inputCEP.style.border = "none";
        spanErroCEP.innerHTML = ""

    }
}