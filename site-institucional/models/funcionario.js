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
