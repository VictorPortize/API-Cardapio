"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify = require("restify");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.startServer = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.application = restify.createServer();
                _this.application.use(restify.plugins.jsonBodyParser());
                _this.application.use(restify.plugins.queryParser());
                _this.application.get('/cardapios', function (req, resp, next) {
                    resp.json({ oi: "bye" });
                    return next();
                });
                _this.application.listen('3000', function () {
                    console.log("Ouvindo em: " + _this.application.address());
                    resolve(_this.application);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    Server.prototype.initServer = function () {
        return this.startServer();
    };
    return Server;
}());
exports.Server = Server;
