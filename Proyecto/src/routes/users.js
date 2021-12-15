const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

const usuario = require('../models/usuarios');

const passport = require('passport');

router.get('/users/signin', (req, res)=>{
    res.render('users/signin.hbs');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/', //?no pedido
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res)=>{
    res.render('users/signup.hbs');
});

router.post('/users/signup', async (req, res)=>{
    const{Nombre, Email, contraseña, contraseña2}= req.body;
    const errors = [];
    if(Nombre.length <=0){
        errors.push({text: 'Ingrese Nombre'});
    }
    if(Email.length <=0){
        errors.push({text: 'Ingrese Email'});
    }
    if(contraseña.length <=0){
        errors.push({text: 'Ingrese Contraseña'});
    }
    if(contraseña2.length <=0){
        errors.push({text: 'Ingrese Contraseña a verificar'});
    }
    if(contraseña != contraseña2){
        errors.push({text: 'Contraseñas diferentes'});
    }
    if(contraseña.length  <4){
        errors.push({text: 'Contraseña mayor a cuatro caracteres'})
    }
    if(errors.length > 0 ){
        res.render('users/signup', {errors, Nombre, Email, contraseña, contraseña2});
    }else{
          const emailusuario= await usuario.findOne({Email: Email});
          if(emailusuario){
              req.flash('error_msg', 'Correo electronico en uso');
              res.redirect('/users/signup');
            }
          const newusuario= new usuario({Nombre, Email, contraseña});
          newusuario.password = await newusuario.encryptPassword(contraseña)
          await newusuario.save();
          req.flash('success_msg', 'Te registraste con exito');
          res.redirect('/users/signin');
        }
});

router.get('/users/logout', (req, res)=>{
req.logOut();
res.redirect('/')
});
module.exports = router;
