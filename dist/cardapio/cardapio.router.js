"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var cardapio_model_1 = require("./cardapio.model");
var CardapioRouter = /** @class */ (function () {
    function CardapioRouter() {
    }
    CardapioRouter.prototype.applyRoutes = function (application) {
        /**
         * Rota da GET da API, busca no banco de dados todos os dados do cardapio
         */
        application.get('/cardapios', function (req, resp, next) {
            cardapio_model_1.Cardapio.find()
                .sort("prato")
                .then(function (response) { return resp.json(response); })
                .catch(function (e) { return next(e); });
            return (next);
        });
        /**
         * Rota POST que insere no banco de dados os dados da api
         */
        application.post('/cardapios', function (req, resp, next) {
            var cardapio = new cardapio_model_1.Cardapio(req.body);
            var file = req.files.foto_prato;
            fs.readFile(file.path, function (err, data) {
                cardapio.foto_prato = { filename: 'foto_prato', img: data };
                cardapio.save()
                    .then(function (document) {
                    if (document) {
                        resp.json(document);
                    }
                    else {
                        next(400);
                    }
                    return next();
                });
            });
        });
    };
    return CardapioRouter;
}());
exports.cardapioRouter = new CardapioRouter();
