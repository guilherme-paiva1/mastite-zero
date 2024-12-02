var reqCompost = null;

var dataAtual = new Date()
var diaAtual = dataAtual.getDate()
var mesAtual = (dataAtual.getMonth() + 1)
var anoAtual = dataAtual.getFullYear();
var umiMediaSemana = null;
var relacaoColetas =  null;
var sensorAnalogico = null;

titulo_dashboard_fazenda.innerHTML = `Dados - ${diaAtual}/${mesAtual}/${anoAtual}`
legenda_dashboard_fazenda.innerHTML = `Dados da fazenda referente ao dia ${diaAtual}/${mesAtual}/${anoAtual}.`

function mostrarCompost(idCompost) {
    
    if (idCompost == "#") {
        selectCompost.disabled = true;
        selectGrupo.disabled = true;
        mostrarFazenda(selectFazenda.value);
    } else {
        sessionStorage.FK_FAZENDA = selectFazenda.value;
        selectGrupo.disabled = false;
        dashCompost.style.display = 'flex';
        dashFazenda.style.display = 'none';
        dashGrupo.style.display = 'none';
        selectGrupo.value = '#';
        
        
        var fkEmpresa = sessionStorage.FK_EMPRESA;
        var fkFazenda = Number(document.getElementById("selectFazenda").value);
        
        
        if (fkEmpresa == null || fkEmpresa == undefined) {
            // location.replace("/cadastrar.html");
        } else {
            var idCompost = Number(document.getElementById("selectCompost").value);
            console.log(idCompost);
            
            if (reqCompost != null) {
                clearInterval(reqCompost);
            }

            reqCompost = setInterval(() => {
                buscarDadosCompost(fkFazenda, idCompost);
            }, 2000);
        }
    }
}

async function buscarDadosCompost(idFazenda, idCompost) {
    console.log(idFazenda);
    await fetch(`/compost/buscar/${idCompost}/${idFazenda}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resposta) => {
        if (resposta.ok) {
            if (resposta.status == 204) {
                kpiMaiorNivelRegistrado.innerHTML = "Sem sensores na atual compost barn";
                kpiMaiorNivelRegistrado.innerHTML = "Sem sensores na atual compost barn";
                kpiNivelMedioRegistrado.innerHTML = "Sem sensores na atual compost barn";
                kpiNivelMinimoRegistrado.innerHTML = "Sem sensores na atual compost barn";
                
                kpiSensoresAcima.innerHTML = "Sem sensores na atual compost barn";
                kpiTotalAlertas.innerHTML = "Sem sensores na atual compost barn";
            } else {
                resposta.json().then((dados) => {
                        
                        // var umidadeAtual = dado.umidadeAtual;

                        // if(umidadeAtual > 60 || umidadeAtual < 40){
                        //     situacaoCompost.innerHTML = "Alerta";
                        //     situacaoCompost.style.color = "red";
                        // }else{
                        //     situacaoCompost.innerHTML = "OK";
                        //     situacaoCompost.style.color = "green";
                        // }
                        var dadosKpi = dados.dadosKpi;
                        var dadosUmidadeHora = [];
                        var horariosUmidadeHora = [];
                        var dadosUmidadeSemana = [0,0,0,0,0,0];
                        
                        // var dataUmidadeMaxima = dadosKpi[0].dataUmidadeMaxima.shift().toLocaleString("pt-BR", {
                        //     timeZone: "America/Sao_Paulo"
                        // });
                        console.log(dadosKpi[0].dataUmidadeMaxima);
                        kpiMaiorNivelRegistrado.innerHTML = `${Number(dadosKpi[0].umidadeMaxima).toFixed(2)}% ás `;
                         kpiMaiorNivelRegistrado.innerHTML += dadosKpi[0].dataUmidadeMaxima.substring(11, 19);
                        kpiNivelMedioRegistrado.innerHTML = `${Number(dadosKpi[0].nivelMedio).toFixed(2)}%`;
                        kpiNivelMinimoRegistrado.innerHTML = `${Number(dadosKpi[0].nivelMinimo).toFixed(2)}%`;
                        
                        kpiSensoresAcima.innerHTML =dadosKpi[0].sensoresAcima;
                        
                        kpiTotalAlertas.innerHTML = dadosKpi[0].qtdAlertas;

                        if(Number(dadosKpi[0].sensoresAcima) > 0){
                            situacaoCompost.innerHTML = "Alerta";
                            situacaoCompost.style.color = "red";
                        }else{
                            situacaoCompost.innerHTML = "OK";
                            situacaoCompost.style.color = "green";
                        }


                        for (var i = 0; i < dados.dadosGraficoUmidadeSemana.length; i++) {
                            var dadoAtual = dados.dadosGraficoUmidadeSemana[i];
                            dadosUmidadeSemana[dadoAtual.diaSemana] = Number(dadoAtual.umidadeMediaSemana).toFixed(0);
                        }

                        for (var i = 0; i < dados.dadosGraficoUmidadeHora.length; i++) {
                            var dadoAtual = dados.dadosGraficoUmidadeHora[i];
                            dadosUmidadeHora.push(Number(dadoAtual.umidadeHora).toFixed(1));
                            horariosUmidadeHora.push(dadoAtual.horaHora);
                        }
                        

                        if(sensorAnalogico != null){
                            var labelHoraInversa = horariosUmidadeHora.reverse();
                            var umidadeHoraInversa = dadosUmidadeHora.reverse();

                            umiMediaSemana.data.datasets[2].data = dadosUmidadeSemana;
                            relacaoColetas.data.datasets[0].data = [dados.dadosGraficoUmidadeHora[0].coletasAcima, dados.dadosGraficoUmidadeHora[0].coletasAbaixo, dados.dadosGraficoUmidadeHora[0].coletasIdeais];
                            sensorAnalogico.data.datasets[0].data = umidadeHoraInversa;
                            sensorAnalogico.data.labels = labelHoraInversa;

                            umiMediaSemana.update();
                            relacaoColetas.update();
                            sensorAnalogico.update();
                        }else{
                            umiMediaSemana = new Chart(document.getElementById('umiMediaSemana').getContext('2d'), {
                                data: {
                                    labels: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado","Domingo"],
                                    datasets: [{
                                        type: 'line',
                                        label: 'Umidade máxima (60%)',
                                        borderColor: '#b41b1b',
                                        backgroundColor: '#b41b1b',
                                        data: [60, 60, 60, 60, 60, 60, 60]
                                    }, {
                                        type: 'line',
                                        label: 'Umidade mínima (40%)',
                                        borderColor: '#b41b1b',
                                        backgroundColor: '#b41b1b',
                                        data: [40, 40, 40, 40, 40, 40, 40]
                                    },{
                                        type: 'bar',
                                        label: 'Umidade média do CB',
                                        borderColor: "#22603A",
                                        backgroundColor: "#22603A",
                                        data: dadosUmidadeSemana
                                    }],
                                },
                                options: {
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Umidade ideal x  Umidade média na semana',
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
                            });
    
                            relacaoColetas = new Chart(document.getElementById('relacaoColetas').getContext('2d'), {
                                type: 'pie',
                                data: {
                                    labels: ["Valor acima do ideal", "Valor abaixo do ideal", "Valor ideal"],
                                    datasets: [{
                                        data: [dados.dadosGraficoUmidadeHora[0].coletasAcima, dados.dadosGraficoUmidadeHora[0].coletasAbaixo, dados.dadosGraficoUmidadeHora[0].coletasIdeais],
                                        backgroundColor: ["#fed859","#ffa500", "#22603A"]
                                    }]
                                }, 
                                options: {
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Relação de coletas do sensor',
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
                                            align: 'center'
                                        }
                                    },
                                }
                            });
                            var labelHoraInversa = horariosUmidadeHora.reverse();
                            var umidadeHoraInversa = dadosUmidadeHora.reverse();
                            sensorAnalogico = new Chart(document.getElementById('sensorAnalogico').getContext('2d'), {
                                type: 'line',
                                data: {
                                    labels: labelHoraInversa,
                                    datasets: [{
                                        label: 'Umidade',
                                        borderColor: "#22603A",
                                        data: umidadeHoraInversa
                                    }, {
                                        label: 'Umidade máxima (60%)',
                                        borderColor: '#b41b1b',
                                        backgroundColor: '#b41b1b',
                                        data: [60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60]
                                    }, {
                                        label: 'Umidade mínima (40%)',
                                        borderColor: '#b41b1b',
                                        backgroundColor: '#b41b1b',
                                        data: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]
                                    }]
                                },
                                options: {
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Variação de umidade por hora',
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
                                            align: 'center'
                                        }
                                    },
                                    
                                    scales: {
                                        x: {
                                            beginAtZero: false,
                                            ticks: {
                                                color: "#fffff"
                                            }
                                        },
                                        y: {
                                            title: {
                                                display: true,
                                                text: '(%)',
                                            },
                                            beginAtZero: false
                                        },
                                    },
                                }
                            });
    
                        }
                        /*  if(dado.umidadeMedia == null){
                             umidadeMedia.innerHTML = "0%"
                         }else{
                             umidadeMedia.innerHTML = `${Number(dado.umidadeMedia).toFixed(2)}%`
                         } */
                    console.log(dados);
                })
            }
        } else {
            console.log("Deu tudo errado")
        }
    }).catch((erro) => {
        console.log(erro);
    })
}

function listarPorFazenda(idFazenda) {
    console.log('No front:' + idFazenda);
    fetch("/compost/listarPorFazenda", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idFazendaServer: idFazenda
        })
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            resposta.json().then(json => {
                var tamanho_lista = json.length;
                var estrutura = '<option selected value="#">Selecione um Compost Barn</option>';
                
                for (var i = 0; i < tamanho_lista; i++) {
                    var idCompost = json[i].id_cb;
                        var apelidoCompost = json[i].apelido;

                        estrutura += 
                        `<option value="${idCompost}">${apelidoCompost}</option>`;
                        spanNumeroCompost.innerHTML = `Compost ${apelidoCompost}`;
                    }
                    spanNumeroFazenda.innerHTML = `Fazenda ${idFazenda}`;

                    selectCompost.innerHTML = estrutura;
                });

            } else {
                console.log('Não listou os composts');
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}
