var vezesClicadas = 0;

function novoFuncionario() {
  var modal = modalNovoFuncionario;

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  modal.style.display = "flex"
}
function fecharModal() {
  var modal = modalNovoFuncionario;

  modal.style.display = "none";
}

function excluirUsuario() {
  var modal = modalExcluirUsuario;

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  modal.style.display = "flex";
}

function negarExclusao() {
  var modal = modalExcluirUsuario;

  modal.style.display = "none";
}

function editarUsuario(botao) {

  const emailInput = botao.closest('tr').querySelector('#inputEmailFuncionario');
  const nomeInput = botao.closest('tr').querySelector("#inputNomeFuncionario");


  if (vezesClicadas == 1) {
    emailInput.disabled = true;
    nomeInput.disabled = true;
    vezesClicadas = 0;
  } else {
    vezesClicadas++;
    emailInput.disabled = false;
    nomeInput.disabled = false;
    emailInput.focus();
  }

  
}
function cadastrarFuncionario(){
  var tipoConta = selectNovoTipo.value;
  var nome = inputNovoNome.value;
  var email = inputNovoEmail.value;
  var senha = inputNovoSenha.value;
  var confirSenha = inputNovoConfirmarSenha.value;
  var mensagem = "";
  var estilo = "";
  var entradasValidas = false;
  var tag = "";

  selectNovoTipo.style.border = "";
  inputNovoNome.style.border = "";
  inputNovoEmail.style.border = "";
  inputNovoSenha.style.border = "";
  inputNovoConfirmarSenha.style.border = "";
  selectNovoTipo.style.innerHTML = "";
  inputNovoNome.style.innerHTML = "";
  inputNovoEmail.style.innerHTML = "";
  inputNovoSenha.style.innerHTML = "";
  inputNovoConfirmarSenha.style.innerHTML = "";
  

  if(tipoConta == "#"){
    
    tipoConta.innerHTML = "Por favor selecione o tipo da conta";
  }else if(nome.length == 1){
    
    inputNovoNome.innerHTML = "Por favor insira um nome valido";
  }else if(email.includes("@") == false){
    
    inputNovoEmail.innerHTML = "Por favor insira um email válido (precisa conter @)";
  }else if(email.length < 1){
    
    inputNovoEmail.innerHTML = "Por favor insira um email válido";
  }else if(email.endsWith(".com") == false || email.endsWith(".br") == false){
    
    inputNovoEmail.innerHTML  = "Por favor insira um email válido (precisa conter .com ou .br no final)";
  }else if(senha.length < 0){

    inputNovoEmail.innerHTML  = "Por favor insira uma senha válida";
  }else if(senha != confirSenha){
    // Coringuei
    werwrewrewrew = "Suas senhas não conhecidem"
  }else{
    entradasValidas = true;
  }

  if(entradasValidas){
    estilo = "";
  }else{
    estilo = "solid 1px red";
  }

    divMensagem.innerHTML = mensagem;
}