
function logar() {
    var opcao = selectTipo.value;

    var CNPJ_EMPRESA_CONTA = "123. 456/7891-23";
    var SENHA_EMPRESA_CONTA = "Cb_safe#009";

    var EMAIL_USUARIO_CONTA = "lucas@gmail.com";
    var SENHA_USUARIO_CONTA = "Lucas@2603";

    if(opcao == "empresa"){
        var cnpj = inputCnpj.value;
        var senha = inputSenha.value;
        
        if(cnpj != CNPJ_EMPRESA_CONTA || SENHA_EMPRESA_CONTA != senha){
           spanErro.innerHTML = `Senha ou cnpj invalidos !`
        }else{
            spanErro.innerHTML = "";
            spanErro.innerHTML = "";
            spanSucesso.innerHTML = "Login correto";
        }
    }else{
        var email = inputEmail.value;
        var senha = inputSenha.value;

        if(email != EMAIL_USUARIO_CONTA || SENHA_USUARIO_CONTA != senha){
            spanErro.innerHTML = `Senha ou email invalidos !`
         }else{
             spanErro.innerHTML = "";
             spanErro.innerHTML = "";
             spanSucesso.innerHTML = "Login correto";
         }
    }

    
}

function validarCnpj(){
    if(cnpj.length < 14 || cnpj.length > 14){
        inputCnpj.style.border = "solid 1px red";
        spanErroCnpj.innerHTML = "CNPJ inválido! O CNPJ precisa ter 14 dígitos"
    }else{
        inputCnpj.style.border = "none";
        spanErroCnpj.innerHTML = ""
    }
}

function mudarOpcao(){
    var opcao = selectTipo.value;
    if(opcao == "usuario"){
        campoInput.innerHTML = `<input type="email" id="inputEmail" placeholder="Email"> 
                        <input type="password" id="inputSenha" placeholder="Senha">
                        <button class="btn-cadastro" onclick="logar()">Entrar</button>`
    }else{
       campoInput.innerHTML = ` <input type="text" id="inputCnpj" placeholder="CNPJ" oninput="validarCnpj()"> 
                        <input type="password" id="inputSenha" placeholder="Senha">
                        <button class="btn-cadastro" onclick="logar()">Entrar</button>`
    }
    
}