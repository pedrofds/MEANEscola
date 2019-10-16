module.exports = (app) => {
    
    return {
        
        validarToken: (req, res, next) => {
            
            if(req.originalUrl == "/funcionario/login" || req.originalUrl == "/funcionario/registrar" || req.originalUrl == "/funcionario/usuarioLogado"){
                next();
            } else{
                //let token = req.headers.token
                const authorization = req.get('authorization');
                //console.log(authorization+"asdf")
                var token = "";
                if (authorization && typeof authorization !== 'undefined'){
                    token = authorization.split('Bearer ')[1];
                    console.log(token)
                }
                console.log(token)
                
                if(token == "" || token == "tokeninvalido") {
                    res.end("Token inválido ou nao foi enviado")
                } else {
                    app.get("jwt").verify(token, "senhasupersecreta", (err, decoded) => {
                            if(err){
                                res.end(err)
                            } else {
                                req.decoded = decoded
                                next()
                            }
                        })

                    // next();
                }
            }
        }
    }
}