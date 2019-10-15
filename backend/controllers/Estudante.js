module.exports = function(app) {
    let estudantesModel = app.get("mongoose").model("Estudante")
    
    return {
        // Add Estudante
        adicionar : (req, res, next) => {
            console.log(req)
            estudantesModel.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                
                res.json(data)
            }
            })
        },
        listar : (req, res) => {
            estudantesModel.find((error, data) => {
            if (error) {
                return next(error)
            } else {
                console.log(data)
                res.json(data)
            }
            })
        },
        consultarPorId : (req, res) => {
            estudantesModel.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
            })
        },
        atualizar: (req, res, next) => {
            estudantesModel.findByIdAndUpdate(req.params.id, {
            $set: req.body
            }, (error, data) => {
            if (error) {
                return next(error);
                console.log(error)
            } else {
                res.json(data)
                console.log('Estudante successfully updated!')
            }
            })
        },
        // Delete Estudante
        excluir : (req, res, next) => {
            estudantesModel.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                msg: data
                })
            }
            })
        }
    }
}