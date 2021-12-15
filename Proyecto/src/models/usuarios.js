
const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcryptjs = require('bcryptjs');

const UsuarioSchema = new Schema({
  Nombre: {type: String, required: true},
  Email: { type: String, required: true},
  contraseña: {type: String, required: true},
  date: {type: Date, default: Date.now }
});

UsuarioSchema.methods.encryptPassword = async(contraseña)=>{
  const salt= await  bcryptjs.genSalt(10);
  const hash = bcryptjs.hash(contraseña, salt);
  return hash;
};

UsuarioSchema.methods.matchPassword= async function(contraseña){
  return await bcryptjs.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('usuarios', UsuarioSchema)