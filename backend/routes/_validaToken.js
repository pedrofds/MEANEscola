module.exports = function(app) {
    app.use("*", app.middlewares.auth.validarToken)
  }  