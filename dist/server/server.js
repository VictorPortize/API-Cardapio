"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require("restify");
var mongoose = require("mongoose");
var cardapio_router_1 = require("../cardapio/cardapio.router");
var Server = /** @class */ (function () {
    function Server() {
    }
    /**
     * Inicia o banco de dados
     */
    Server.prototype.startDb = function () {
        return mongoose.connect('mongodb://localhost/cardapio-api', {
            useNewUrlParser: true
        });
    };
    /**
     * Inicia o servidor
     */
    Server.prototype.startServer = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.application = restify.createServer();
                _this.application.use(restify.plugins.jsonBodyParser());
                _this.application.use(restify.plugins.multipartBodyParser());
                cardapio_router_1.cardapioRouter.applyRoutes(_this.application);
                _this.application.listen('3000', function () {
                    console.log("Ouvindo em: " + _this.application.address().port);
                    resolve(_this.application);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Inicia as instancias do server
     */
    Server.prototype.initServer = function () {
        var _this = this;
        return this.startDb().then(function () { return _this.startServer(); });
    };
    return Server;
}());
exports.Server = Server;
