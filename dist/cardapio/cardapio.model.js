"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
/**
 * Schema do cardápio
 */
var cardapioSchema = new mongoose.Schema({
    foto_prato: {
        type: Object,
        required: false
    },
    prato: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 120,
    },
    preco: {
        type: Number,
        required: true,
    },
    ingredientes: {
        type: Array,
        required: true,
    }
});
exports.Cardapio = mongoose.model('cardapio', cardapioSchema);
