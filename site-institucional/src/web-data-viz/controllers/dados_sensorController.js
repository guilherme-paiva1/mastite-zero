var medidaModel = require("../models/dados_sensorModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var grupo = req.params.grupoSensor;
    var compost = req.params.idCompost;


    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(grupo, compost).then(function (resultado) {
        if (resultado.length > 0) {
                let menorTempo = Infinity;
                let pontoAlto = null;
                res.status(200).json(resultado);
                // resultado.forEach((dado, index) => {
                //   const umidadeAtual = dado.umidade;
                //   const dataHoraAtual = new Date(dado.data_hora);
              
                //   if (umidadeAtual >= 50) {
                //     // Define  ponto alto de umidade (>= 50%)
                //     pontoAlto = { data_hora: dataHoraAtual, umidade: umidadeAtual };
                //   } else if (pontoAlto && umidadeAtual <= 30) {

                //     // Verifica um ponto alto de umidade (<= 30%)
                //     const diferencaTempo = (dataHoraAtual - pontoAlto.data_hora) / (1000 * 60); // em minutos
                //     if (diferencaTempo < menorTempo) {
                //       menorTempo = diferencaTempo;
                //     }
                //     // Reset o ponto alto para buscar outra oscilação
                //     pontoAlto = null;
                //   }
                  
                // });
                // if (menorTempo !== Infinity) {
                    
                //     var somaUmidade = 0;
                //     var quantidadeForaIntervalo = 0;
                    
                //     console.log(resultado.length)

                //     for (var i = 0; i < resultado.length; i++) {
                //     var dado = resultado[i];

                //     somaUmidade += Number(dado.umidade);
                    
                //     if (dado.umidade >= 40 && dado.umidade <= 60) {
                //         quantidadeForaIntervalo++;
                //     }
                    
                // }
                //     const mediaUmidade = somaUmidade / resultado.length;
                //     console.log(mediaUmidade);
                //     resultado.push
                //     (
                //         {mediaUmidade},
                //         {quantidadeForaIntervalo},
                //         {menorTempo: menorTempo.toFixed(2)}
                //     );

                //     res.status(200).json(resultado);
                //   } else {
                //     res.status(204).json({mensagem: "Nenhuma oscilação encontrada entre pontos alto e baixo."});
                //   }
              
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoReal(req, res) {
    var idSensor = req.params.idSensor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal

}