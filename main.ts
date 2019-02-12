import { Server } from './server/server'

/**
 * Importa e ativa cria uma instancia do server
 */
const server = new Server()

/**
 * inicia o server
 */
server.initServer().then(() => {
    console.log("server open")
}).catch(error => console.log(error))