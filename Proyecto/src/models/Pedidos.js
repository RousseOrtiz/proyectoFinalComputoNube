const mongoose = require('mongoose');
const {Schema} = mongoose;

const PedidoSchema = new Schema({
    tipocafe: {type: String, required: true},
    tueste: { type: String, required: true},
    cantidadpaquetes: {type: Number, required: true},
    direccion: { type: String, required: true},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedidos', PedidoSchema)