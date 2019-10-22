module.exports = function(app) {
 // app.use("*", app.middlewares.auth.validarToken)
  const funcionarioController = app.controllers.Funcionario   

  app.get("/funcionario", funcionarioController.listar)
  app.get("/funcionario/:id", funcionarioController.consultarPorId)
  app.post("/funcionario", funcionarioController.adicionar)
  app.put("/funcionario/:id", funcionarioController.atualizar)
  app.delete("/funcionario/:id", funcionarioController.excluir)
  app.post("/funcionario/registrar", funcionarioController.registrar)
  app.post("/funcionario/login", funcionarioController.login)
  app.get("/funcionario/usuarioLogado", funcionarioController.usuarioLogado)
  
}
