const passport = require('passport');
const LocalStrategy = require('passport-local');

const usuarios = require('../models/usuarios');

passport.use(new LocalStrategy({
usernameField: 'Email'
}, async(Email, contraseña, done ) =>{
   const usuario  =  await usuarios.findOne({Email: Email});
   if(!usuario){
       return done(null, false, {massage: 'Usuario no encontrado'});
   }else {
      const match = await usuario.matchPassword(contraseña);
      if(match){
          return done(null, usuario);
      }else{
          return done(null, false, {massage: 'Contraseña incorrecta'});
      }
   }
}));

passport.serializeUser((usuario, done)=>{
    done(null, user.id);
});
 
passport.deserializeUser((id, done)=>{
    usuarios.findById(id, (err, usuario)=>{
        done(err, usuario);
    });
});