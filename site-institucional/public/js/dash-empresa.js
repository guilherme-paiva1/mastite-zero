listarPorEmpresa(sessionStorage.FK_EMPRESA);

function listarPorEmpresa(idEmpresa) {
    console.log('No front:' + idEmpresa);
    fetch("/fazendas/listarPorEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idEmpresaServer: idEmpresa
        })
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                resposta.json().then(json => {
                    var tamanho_lista = json.length;
                    var estrutura = '';
                    
                    for (var i = 0; i < tamanho_lista; i++) {
                        var idFazenda = json[i].id_fazenda;
                        var nomeFazenda = json[i].nome;
                        
                        estrutura += 
                        `<option value="${idFazenda}">${nomeFazenda}</option>`;
                    }
                    selectFazenda.innerHTML += estrutura;
                });

            } else {
                console.log('Não listou as fazendas');
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}

function manipularSessionFazenda(idFazenda) {
    sessionStorage.FK_FAZENDA = idFazenda;
}
