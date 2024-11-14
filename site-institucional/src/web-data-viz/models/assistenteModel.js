async function pergunta(mensagem, modeloIA){
  var resultado = await modeloIA.generateContent(`Em um paragráfo responda: ${mensagem}`);

  const resposta = await resultado.response.text();

  return resposta;
}

module.exports = {
  pergunta
}