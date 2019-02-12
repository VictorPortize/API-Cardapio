import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { cardapioRouter } from '../cardapio/cardapio.router'



export class Server {

    application : restify.Server

    /**
     * Inicia o banco de dados
     */
    startDb(){
        return mongoose.connect('mongodb://localhost/cardapio-api',{
            useNewUrlParser:true
        })
    }
    
    /**
     * Inicia o servidor
     */
    startServer(): Promise<any>{
        return new Promise((resolve,reject)=>{
            try{
                this.application = restify.createServer()

                this.application.use(restify.plugins.jsonBodyParser())
                this.application.use(restify.plugins.multipartBodyParser())

                cardapioRouter.applyRoutes(this.application)

                this.application.listen('3000',() => {
                    console.log(`Ouvindo em: ${this.application.address().port}`)
                    resolve(this.application)
                })

            }catch(e){
                reject(e)
            }
        })
    }

    /**
     * Inicia as instancias do server
     */

    initServer(): Promise<Server>{
        return this.startDb().then(() => this.startServer())
    }

}