import * as restify from 'restify'
import * as fs from 'fs'
import { Cardapio } from './cardapio.model'

class CardapioRouter{
    applyRoutes(application : restify.Server){

        /**
         * Rota da GET da API, busca no banco de dados todos os dados do cardapio
         */
        application.get('/cardapios',(req,resp,next) =>{
            Cardapio.find()
                .sort("prato")
                .then(response => resp.json(response))
                .catch(e => next(e))
                return (next)
        })

        /**
         * Rota POST que insere no banco de dados os dados da api
         */
        application.post('/cardapios',(req,resp,next) =>{
            let cardapio = new Cardapio(req.body)
            let file = req.files.foto_prato
            console.log(file)
            if(file != undefined){
                fs.readFile(file.path,(err, data)=> {
                    cardapio.foto_prato ={filename:'foto_prato',img:data}
                    cardapio.save()
                    .then(document => {
                        if(document){
                            resp.json(document)
                        }else{
                            next(400)
                        }
                        return next()
                    })
                })
            }else{
                cardapio.save()
                    .then(document => {
                        if(document){
                            resp.json(document)
                        }else{
                            next(400)
                        }
                        return next()
                    })
            }
        })
    }
}

export const cardapioRouter = new CardapioRouter()