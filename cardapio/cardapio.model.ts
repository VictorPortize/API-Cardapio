import * as mongoose from 'mongoose'


/**
 * Interface que estende o cardápio para utilização prévia
 */
export interface Cardapio extends mongoose.Document{
    foto_prato: object,
    prato: string,
    preco: number,
    ingredientes: []
}

/**
 * Schema do cardápio
 */
const cardapioSchema = new mongoose.Schema({
    foto_prato:{
        type:Object,
        required:false
    },
    prato:{
        type:String,
        required:true,
        minlength:5,
        maxlength:120,
    },
    preco:{
        type:Number,
        required:true,
    },
    ingredientes:{
        type:Array,
        required:true,
    }
})

export const Cardapio = mongoose.model<Cardapio>('cardapio',cardapioSchema)