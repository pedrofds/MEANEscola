
module.exports = (app) => {
  // Definir o schema
  let Estudante = app.get("mongoose").Schema({
    estudante_name: { type: String , required: [true, 'é obrigatório'] },
    estudante_email: { type: String , required: [true, 'é obrigatório'], match: [/\S+@\S+\.\S+/, 'é inválido']},
    bloco: { type: String },
    sugestao: { type: Array },
    genero: { type: String },
    aniversario: { type: Date }
  })

  app.get("mongoose").model("Estudante", Estudante)
}