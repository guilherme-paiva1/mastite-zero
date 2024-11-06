var vezesClicadas = 0;

function listarFuncionarios() {
  var idUsuario = sessionStorage.ID_USUARIO;

  // Enviando o valor para função no Model
  fetch("/usuarios/listarUsuarioPeloSupervisor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // atributo do JSON recebe a id do usuário logado atualmente, ou seja, o supervisor
      fkSupervisor: idUsuario
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log('tá funcionando');
      } else {
        throw "Houve um erro ao listar os usuários!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar();
    });

  return false;
}

function cadastrarFuncionario() {
  var tipoConta = selectNovoTipo.value;
  var nome = inputNovoNome.value;
  var email = inputNovoEmail.value;
  var senha = inputNovoSenha.value;
  var confirSenha = inputNovoConfirmarSenha.value;
  var fkFazenda = sessionStorage.FK_FAZENDA;
  var fkSupervisor = sessionStorage.ID_USUARIO;
  var fkEmpresa = sessionStorage.FK_EMPRESA;
  var mensagem = "";
  var entradasValidas = false;

  var terminaCom = email.endsWith('.com') || email.endsWith('br');
  if (tipoConta == "#") {
    mensagem = "Por favor, selecione o tipo da conta";

  } else if (nome.length <= 1) {
    mensagem = "Por favor, insira um nome valido";

  } else if (email.includes("@") == false) {
    mensagem = "Por favor, insira um email válido (precisa conter @)";

  } else if (email.length <= 5) {
    mensagem = "Por favor, insira um email válido";

  } else if (terminaCom == false) {
    mensagem = "Por favor, insira um email válido (precisa conter .com ou .br no final)";

  } else if (senha.length <= 6) {
    mensagem = "A senha deve conter ao menos 6 caracteres";

  } else if (senha != confirSenha) {
    mensagem = "Suas senhas não coincidem";

  } else {
    entradasValidas = true;
  }

  if (entradasValidas) {
    // Enviando o valor para função no Model
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // atributo do JSON recebe a id do usuário logado atualmente, ou seja, o supervisor
        nome: nome,
        email:email,
        senha: senha,
        fkEmpresa: fkEmpresa,
        fkFazenda: fkFazenda,
        fkSupervisor: fkSupervisor
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          console.log('tá funcionando');
        } else {
          throw "Houve um erro ao cadastrar o usuário";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

  divMensagem.innerHTML = mensagem;
}

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
