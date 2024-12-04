var reqFazenda = null;
var reqGrupo = null;
var graficoBarraFazenda = null;

var dataAtual = new Date()
        var diaAtual = dataAtual.getDate().toString()
        var mesAtual = (dataAtual.getMonth() + 1)
        var anoAtual = dataAtual.getFullYear()
        // var diaFormatado = "0";

        // if(diaAtual.length == 1){
        //     diaAtual = "0" + diaAtual;
        //     console.log(diaAtual)
        // }

        titulo_dashboard_compost.innerHTML = ` - ${diaAtual}/${mesAtual}/${anoAtual}`
        // legenda_dashboard_compost.innerHTML = `Dados do Compost Barn referente ao dia ${diaAtual}/${mesAtual}/${anoAtual}.`

        function mostrarFazenda(idFazenda) {
            if (idFazenda == "#") {
                selectCompost.disabled = true;
                selectGrupo.disabled = true;
                dashCompost.style.display = 'none';
                telaInicial.style.display = 'flex';
                dashFazenda.style.display = 'none';
                dashGrupo.style.display = 'none';
                selectCompost.value = '#';
                selectGrupo.value = '#';
            } else {
                sessionStorage.FK_FAZENDA = idFazenda;
                listarPorFazenda(sessionStorage.FK_FAZENDA); 
                selectCompost.disabled = false;
                dashFazenda.style.display = 'flex';
                dashCompost.style.display = 'none';
                telaInicial.style.display = 'none';
                dashGrupo.style.display = 'none';
                selectCompost.value = '#';
                selectGrupo.value = '#';
                var fkEmpresa = sessionStorage.FK_EMPRESA;
                
                if(fkEmpresa == null || fkEmpresa == undefined){
                    // location.replace("/cadastrar.html");
                }else{
                    var idFazenda = document.getElementById("selectFazenda").value;

                        if(reqFazenda != null){
                            clearInterval(reqFazenda);
                        }
                        if(reqGrupo != null){
                            clearInterval(reqGrupo);
                        }
                        reqFazenda = setInterval(()=> {
                            buscarDadosFazenda(fkEmpresa, idFazenda);
                        }, 2000);
                    }
                }
            }
        function mostrarGrupo (idGrupo) {
            if (idGrupo == "#") {
                mostrarCompost(selectCompost.value);
                selectGrupo.value = '#';
            } else {
                selectGrupo.disabled = false;
                spanNumeroGrupo.innerHTML = `Grupo ${idGrupo}`;
                dashFazenda.style.display = 'none';
                dashCompost.style.display = 'none';
                dashGrupo.style.display = 'flex';

                if(reqFazenda != null){
                    clearInterval(reqFazenda);
                } 

                reqGrupo = setInterval(() => {
                    buscarDadosGrupo(idGrupo)
                }, 2000);


            }
        }

        // Deixa as linhas do gráfico tracejadas e define o tamanho (15) e o espaço entre elas (5)
        // Chart.defaults.elements.line.borderDash = [15, 5];
        // Tira os pontos das linhas do gráfico
        Chart.defaults.elements.point.pointStyle = false;
        
        var paginacao = {};
        var tempo = {};
        
        /*  function obterDados(grafico, endpoint) {
            fetch('http://localhost:3300/sensores/' + endpoint)
            .then(response => response.json())
            .then(valores => {
                if (paginacao[endpoint] == null) {
                    paginacao[endpoint] = 0;
                    }
                    if (tempo[endpoint] == null) {
                        tempo[endpoint] = 0;
                        }
                        
                        var ultimaPaginacao = paginacao[endpoint];
                        paginacao[endpoint] = valores.length;
                        valores = valores.slice(ultimaPaginacao);
                        
                        valores.forEach((valor) => {
                            if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
                                grafico.data.labels.shift();
                                grafico.data.datasets[0].data.shift();
                         }
 
                         grafico.data.labels.push(tempo[endpoint]++);
                         grafico.data.datasets[0].data.push(parseFloat(valor));
                         grafico.update();
                         });
                         })
                         .catch(error => console.error('Erro ao obter dados:', error));
                         }
                         
                         setInterval(() => {
                            obterDados(sensorAnalogico, 'analogico');
                            }, 1500); */
                            
async function buscarDadosFazenda(fkEmpresa, idFazenda){
    
    fetch(`/fazendas/buscar/${fkEmpresa}/${idFazenda}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        }).then((resposta) => {
            if(resposta.ok){
                if(resposta.status == 204){
                    qtdCompost.innerHTML = "Nenhum sensor cadastrado na atual fazenda.";
                    alertasSessenta.innerHTML = "Nenhum sensor cadastrado na atual fazenda."; 
                    alertasQuarentaECinco.innerHTML = "Nenhum sensor cadastrado na atual fazenda.";
                    umidadeMedia.innerHTML = "Nenhum sensor cadastrado na atual fazenda."; 
            }else{
                resposta.json().then((dados)=> {
                    console.log(dados);
                        var dado = dados.dados[0];
                        var umidade = Number(dado.umidadeAtual);

                        console.log(dado);
                        qtdCompost.innerHTML = dado.qtdCompost;
                        alertasSessenta.innerHTML = dado.alertasSessenta;
                        alertasQuarentaECinco.innerHTML = dado.alertasQuarentaECinco;

                        if(umidade > 60 || umidade < 40){
                            situacaoFazenda.innerHTML = "Alerta";
                            situacaoFazenda.style.color = "red";
                        }else{
                            situacaoFazenda.innerHTML = "OK";
                            situacaoFazenda.style.color = "green";
                        }
                        if(dado.umidadeMedia == null){
                            umidadeMedia.innerHTML = "0%"
                        }else{
                            umidadeMedia.innerHTML = `${Number(dado.umidadeMedia).toFixed(2)}%`
                        }

                        var nomesComposts = []; 
                        var umidadeMediaGrafico = [];

                        for (var index = 0; index < dados.dadosGrafico.length; index++) {
                            nomesComposts.push(dados.dadosGrafico[index].nomeCompost);
                            umidadeMediaGrafico.push(dados.dadosGrafico[index].media_umidade);
                        }

                        if(graficoBarraFazenda != null){
                         /*    graficoBarraFazenda.destroy();
                            graficoBarraFazenda = new Chart(document.getElementById('grafico_fazenda').getContext('2d'), {
                                data: {
                                    labels: nomesComposts,
                                    datasets: [{
                                        type: 'bar',
                                        label: 'Umidade média Fazenda',
                                        borderColor: "#22603A",
                                        backgroundColor: "#22603A",
                                        data: umidadeMediaGrafico
                                    }],
                                },
                                options: {
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Umidade média dos Compost Barns (%)',
                                            color: "#22603A",
                                            font: {
                                                size: 24,
                                                weight: 'bold',
                                                family: 'Poppins'
                                            },
                                            padding: {
                                                top: 10,
                                                bottom: 30
                                            },
                                            align: 'center',
                                        }
                                    },
                                }
                            }) */

                                graficoBarraFazenda.data.datasets[0].data = umidadeMediaGrafico;
                                graficoBarraFazenda.update();
                        }else{
                            graficoBarraFazenda = new Chart(document.getElementById('grafico_fazenda').getContext('2d'), {
                                data: {
                                    labels: nomesComposts,
                                    datasets: [{
                                        type: 'bar',
                                        label: 'Umidade média Fazenda',
                                        borderColor: "#22603A",
                                        backgroundColor: "#22603A",
                                        data: umidadeMediaGrafico
                                    }],
                                },
                                options: {
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Umidade média dos Compost Barns (%)',
                                            color: "#22603A",
                                            font: {
                                                size: 24,
                                                weight: 'bold',
                                                family: 'Poppins'
                                            },
                                            padding: {
                                                top: 10,
                                                bottom: 30
                                            },
                                            align: 'center',
                                        }
                                    },
                                }
                            })
                        }
                       

                    })            
            }

        }else{
            console.log("Deu tudo errado")
        }
    }).catch((erro) => {
        console.log(erro);
        });
    }
async function buscarDadosGrupo(grupo){
    var fkCompost = Number(selectCompost.value);
    fetch(`/dados_sensor/ultimas/${grupo}/${fkCompost}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((resposta) => {
        if(resposta.ok){
            if(resposta.status == 204){
                // qtdCompost.innerHTML = "Nenhum sensor cadastrado na atual fazenda.";
                // alertasSessenta.innerHTML = "Nenhum sensor cadastrado na atual fazenda."; 
                // alertasQuarentaECinco.innerHTML = "Nenhum sensor cadastrado na atual fazenda.";
                // umidadeMedia.innerHTML = "Nenhum sensor cadastrado na atual fazenda."; 
            }else{


                resposta.json().then((dados)=> {
                    console.log(`Dados do grupo de sensor ${dados}`)

                    for (var index = 0; index < dados.length; index++) {
                        var dado = dados[index];
                        if(dado.umidadeAtual > 60 || dado.umidadeAtual < 40){
                            situacaoGrupo.innerHTML = "Alerta";
                            situacaoGrupo.style.color = "red";
                        }else{
                            situacaoGrupo.innerHTML = "OK";
                            situacaoGrupo.style.color = "green";
                        }               
                        kpiSensoresFora.innerHTML = dado.sensoresFora;
                        kpiMediaGrupo.innerHTML = dado.mediaGrupo;
                        kpiTempoResposta.innerHTML = dado.tempoResposta;
                    }                    
                })
            }

        }else{
            console.log("Deu tudo errado")
        }
        }).catch((erro) => {
        console.log(erro);
        });
}
