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

function editarUsuario() {


  if (vezesClicadas == 1) {
    inputEmailFuncionario.disabled = true;
    vezesClicadas = 0;
  } else {
    vezesClicadas++;
    inputEmailFuncionario.disabled = false;
    inputEmailFuncionario.focus();
  }
}
