"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server/server");
/**
 * Importa e ativa cria uma instancia do server
 */
var server = new server_1.Server();
/**
 * inicia o server
 */
server.initServer().then(function () {
    console.log("server open");
}).catch(function (error) { return console.log(error); });
