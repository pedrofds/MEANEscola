module.exports = function(app) {
    
    let funcionariosModel = app.get("mongoose").model("Funcionario")

    return {
        // Registar Funcionario
        registrar : (req, res, next) => {
            console.log(req)
            funcionariosModel.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                
                res.json(data)
            }
            })
        },
        // Add Funcionario
        adicionar : (req, res, next) => {
            console.log(req)
            funcionariosModel.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                
                res.json(data)
            }
            })
        },
        listar : (req, res) => {
            funcionariosModel.find((error, data) => {
            if (error) {
                return next(error)
            } else {
                console.log(data)
                res.json(data)
            }
            })
        },
        consultarPorId : (req, res, next) => {
            funcionariosModel.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
            })
        },
        atualizar: (req, res, next) => {
            funcionariosModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
            }, (error, data) => {
            if (error) {
                return next(error);
                console.log(error)
            } else {
                res.json(data)
                // Add Estudante
        adicionar : (req, res, next) => {
            console.log(req)
            funcionariosModel.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                
                res.json(data)
            }
            })
        },
                console.log('Funcionario successfully updated!')
            }
            })
        },
        // Add Estudante
        adicionar : (req, res, next) => {
            console.log(req)
            funcionariosModel.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                
                res.json(data)
            }
            })
        },
        // Delete Funcionario
        excluir : (req, res, next) => {
            funcionariosModel.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                msg: data
                })
            }
            })
        },
        login: (req, res) => {
            let funcionario_email = req.body.funcionario_email,
                senha = req.body.senha
                
                funcionariosModel.findOne({ funcionario_email })
                .then((funcionario) => {
                    console.log(funcionario)
                    if(! funcionario) {
                        res.end("Usuário não encontrado")
                    } else if (funcionario.senha != senha) {
                        res.end("Senha inválida")
                    } else {
                        let payload = { 
                            id: funcionario._id, 
                            funcionario_email 
                        }
                        let token = app.get("jwt").sign(payload, "senhasupersecreta", {
                            expiresIn: 60*60*24
                        })
                        res.json({
                            token,
                            funcionario
                        })
                    }
                })
        },
        usuarioLogado : (req, res, next) => {
            
            /*var token = req.headers['authorization'];
            console.log(0)
            if (!token) 
                return res.status(401).send({ auth: false, message: 'No token provided.' });
            
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                
                res.status(200).send(decoded);
            });*/
        }
    }
}