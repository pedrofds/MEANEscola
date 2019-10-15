
module.exports = (app) => {
  // Definir o schema
  let Estudante = app.get("mongoose").Schema({
    estudante_name: { type: String },
    estudante_email: { type: String },
    bloco: { type: String },
    sugestao: { type: Array },
    genero: { type: String },
    aniversario: { type: Date }
  })

  app.get("mongoose").model("Estudante", Estudante)
}