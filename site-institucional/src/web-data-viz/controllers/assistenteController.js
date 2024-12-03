const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = require("../app");
var assistenteModel = require("../models/assistenteModel");

async function pergunta(req, res){
  const chatIA = new GoogleGenerativeAI(app.CHAVE_ACESSO);
  const mensagem = req.body.pergunta;

  const modeloIA = chatIA.getGenerativeModel({ model: "gemini-pro" });

  console.log(chatIA + " " + modeloIA + app.CHAVE_ACESSO);

      assistenteModel.pergunta(mensagem,modeloIA).then((resposta)=> {
        if(resposta.length > 0){
          return res.status(200).json({resultado: resposta});
        }else{
          return res.status(201).json({});
        }
      }).catch((error)=> {
        console.error(error);
        throw error;
      })
}

module.exports = {
  pergunta
}