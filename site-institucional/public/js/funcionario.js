var vezesClicadas = 0;

function listarFuncionarios() {
  var idUsuario = Number(sessionStorage.ID_USUARIO);
  console.log(idUsuario);
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
        resposta.json().then(json => {
          console.log(json);
          console.log(JSON.stringify(json));
          
          var tamanho_lista = json.length;
          var tabela = '';
          console.log(tamanho_lista);
          for (var i = 0; i < tamanho_lista; i++) {
            var idFuncionario = json[i].id_usuario;
            var nomeFuncionario = json[i].nome;
            var emailFuncionario = json[i].email;
            tabela += `
            <tr>
            <td>
            <input type="text" value="${nomeFuncionario}" disabled id="inputNomeFuncionario${idFuncionario}">
            </td>
            <td>
            <input type="text" value="${emailFuncionario}" disabled id="inputEmailFuncionario${idFuncionario}">
            </td>
            <td>
            <button onclick="editarUsuario(${idFuncionario})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
            </svg>
            </button>
            </td>
            <td>
            <button onclick="excluirUsuario(${idFuncionario})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
            viewBox="0 0 16 16">
            <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
            </button>
            </td>
            </tr>
            `
          }
          console.log(tabela);
          tbody_tabela.innerHTML = 
          `<tr class="tabela-header">
                <th>Nome</th>
                <th>Email</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>` +
          tabela;
        });
      } else {
        div_tabela.innerHTML = "Cadastre um funcionário, e ele aparecerá aqui!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      //finalizarAguardar();
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
        email: email,
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
