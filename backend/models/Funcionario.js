module.exports = (app) => {
   // Definir o schema
   let Funcionario = app.get("mongoose").Schema({
      //_id : { type: String },
      funcionario_name: { type: String, required: [true, 'é obrigatório']  },
      funcionario_email: { type: String, required: [true, 'é obrigatório'], match: [/\S+@\S+\.\S+/, 'é inválido'] },
      cargo: { type: String}, //, required: [true, 'é obrigatório']
      numeroTelefone: { type: Array },
      senha :{ type: String, required: [true, 'é obrigatório'] },
      aniversario: { type: Date },
      genero: { type: String }
   })
 
   app.get("mongoose").model("Funcionario", Funcionario)
 }