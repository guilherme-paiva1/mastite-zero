campos_endereco.style.display = 'none'

var empresa = "";
var responsavel = "";
var email = "";
var senha = "";
var confirmarSenha = "";
var razao = "";

var logradouroValido = false;
var cidadeValida = false;
var estadoValido = false;
var numeroValido = false;
var complementoValido = false;
var cepValido = false;



function voltar() {
    campos_endereco.style.display = 'none'
    campos_empresa.style.display = 'flex'
}

function avancar() {
    campos_empresa.style.display = 'none'
    campos_endereco.style.display = 'flex'
}

function cadastrar() {
    empresa = inputEmpresa.value
    responsavel = inputResponsavel.value
    email = inputEmail.value
    senha = inputSenha.value
    confirmarSenha = inputConfirmaSenha.value
    razao = inputRazao.value;

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

    if (senha != confirmarSenha) {
        spanErroSenha.innerHTML = "As senhas não são identicas"
        spanErroConfirmarSenha.innerHTML = "As senhas não são identicas"
        inputSenha.style.border = "solid 1px red";
        inputConfirmaSenha.style.border = "solid 1px red";

    } else if (senha == 0 || senha < 4) {
        spanErroSenha.innerHTML = "Senha inválida, curta demais"
        spanErroConfirmarSenha.innerHTML = "Senha inválida, curta demais"
        inputSenha.style.border = "solid 1px red";
        inputConfirmaSenha.style.border = "solid 1px red";

    } else if ((email == 0 || email < 7) || email.indexOf("@") < 0 || email.indexOf(".com") < 0) {
        inputEmail.style.border = "solid 1px red";
        spanErroEmail.innerHTML = "Email inválido";

    } else if (responsavel == 0 || responsavel < 4) {
        spanErroResponsavel.innerHTML = "Representante inválido, mínimo de 4 letras ";
    } else if (empresa == 0 || empresa < 3) {
        spanErroEmpresa.innerHTML = "Nome fantasia inválido, mínimo de 3 letras";
    } else if (razao == 0 || razao < 3) {
        spanErroRazao.innerHTML = "Razão social inválida, mínimo de 3 letras";
    } else {
        if (logradouroValido && cidadeValida && estadoValido && numeroValido && complementoValido && cepValido) {
            console.log("VALIDO");
            divMensagem.innerHTML = `Cadastro realizado com sucesso! Bem-vindo ${empresa}`
        }

    }
}

// function validar() {
//     var cnpj = inputCnpj.value

//     console.log(cnpj.length)

//     if (cnpj.length < 14 || cnpj.length > 14) {
//         inputCnpj.style.border = "solid 1px red";
//         spanErroCnpj.innerHTML = "CNPJ inválido! O CNPJ precisa ter 14 dígitos"
//     } else {
//         inputCnpj.style.border = "none";
//         spanErroCnpj.innerHTML = ""

//     }

// }

function validarLogradouro() {
    var logradouro = inputLogradouro.value;
    if (logradouro.length == 0 ||
        logradouro.includes("@") || logradouro.includes("#") || logradouro.includes("$") || logradouro.includes("%") ||
        logradouro.includes("&") || logradouro.includes("*")
    ) {

        spanLogradouro.innerHTML = "Insira um logradouro valido";
        logradouroValido = false;
        spanLogradouro.style.border = "solid 1px red";
    } else {
        logradouroValido = true;
        spanLogradouro.innerHTML = "";
        spanLogradouro.style.border = "none";
    }
}

function validarCidade() {
    var cidade = inputCidade.value;
    if (cidade.length == 0 ||
        cidade.includes("@") || cidade.includes("#") || cidade.includes("$") || cidade.includes("%") ||
        cidade.includes("&") || cidade.includes("*")
    ) {
        spanCidade.innerHTML = "Insira uma cidade valida";
        cidadeValida = false;
        spanCidade.style.border = "none";
    } else {
        cidadeValida = true;
        spanCidade.innerHTML = "";
        spanCidade.style.border = "solid 1px red";
    }
}

function validarNumero() {
    var numero = inputNumero.value;
    if (numero.length == 0) {
        numeroValido = false;
        spanNumero.innerHTML = "Por favor insira um numero valido";
        spanNumero.style.border = "solid 1px red";
    } else {
        numeroValido = true;
        spanNumero.innerHTML = "";
        spanNumero.style.border = "none";
    }
}

function validarComplemento() {
    var complemento = inputComplemento.value;
    if (
        complemento.includes("@") || complemento.includes("#") || complemento.includes("$") || complemento.includes("%") ||
        complemento.includes("&") || complemento.includes("*")
    ) {
        spanComplemento.innerHTML = "Por favor insira um complemento valido";
        spanComplemento.style.border = "solid 1px red";
        complementoValido = false;
    } else {
        complementoValido = true;
        spanComplemento.innerHTML = "";
        spanComplemento.style.border = "none";
    }
}


function validarCnpj() {
    var cnpj = inputCnpj.value

    console.log(cnpj.length)

    if (cnpj.length < 14 || cnpj.length > 14) {
        inputCnpj.style.border = "solid 1px red";
        spanErroCnpj.innerHTML = "CNPJ inválido! O CNPJ precisa ter 14 dígitos"
    } else {
        inputCnpj.style.border = "none";
        spanErroCnpj.innerHTML = ""

    }
}

function validarEmail() {
    var email = inputEmail.value

    if ((email == 0 || email < 7) || email.indexOf("@") < 0 || email.indexOf(".com") < 0) {
        inputEmail.style.border = "solid 1px red";
        spanErroEmail.innerHTML = "Email inválido!";
    } else {
        inputEmail.style.border = "";
        spanErroEmail.innerHTML = "";
    }

}

function validarSenha() {
    var senha = inputSenha.value;
    var possuiEspecial = true;
    var possuiNumero = true;

    for (var i = 0; i <= senha.length; i++) {
        if (senha[i] == "@" || senha[i] == "#" || senha[i] == "$" || senha[i] == "%" || senha[i] == "&" || senha[i] == "*") {
            possuiEspecial = false;
        }
        if (senha[i] >= "0" && senha[i] <= "9") {
            possuiNumero = false;
        }
    }

    if (senha == senha.toLowerCase() || possuiEspecial || possuiNumero) {
        spanErroSenha.innerHTML = `Senha inválida, não atende os requisitos <br> <b>
                                    (1 caractere especial, 1 letra maiúscula e pelo menos 1 numero) </b>`
        inputSenha.style.border = "solid 1px red";
    }

    else if (senha == 0 || senha < 4) {
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

    console.log(CEP)

    if (CEP.length < 9 || CEP.length > 9) {
        inputCEP.style.border = "solid 1px red";
        spanErroCEP.innerHTML = "CEP inválido! O CEP precisa ter 8 dígitos"
        cepValido = false;
    } else {
        cepValido = true;
        inputCEP.style.border = "none";
        spanErroCEP.innerHTML = ""
    } if (CEP.length == 5) {
        inputCEP.value = CEP + "-";
    }
}

function validarEstado() {
    var estado = selectEstado.value;
    if (estado != '#') {
        estadoValido = true;
        spanEstado.innerHTML = "";
        spanEstado.style.border = "none";
    } else {
        estadoValido = false;
        spanEstado.innerHTML = "Por favor, selecione seu estado";
        spanEstado.style.border = "solid 1px red";
    }
}