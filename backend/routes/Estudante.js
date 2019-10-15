module.exports = function(app) {
  app.use("*", app.middlewares.auth.validarToken)
  const estudanteController = app.controllers.Estudante   

  app.get("/estudante", estudanteController.listar)
  app.get("/estudante/:id", estudanteController.consultarPorId)
  app.post("/estudante", estudanteController.adicionar)
  app.put("/estudante/:id", estudanteController.atualizar)
  app.delete("/estudante/:id", estudanteController.excluir)
}


