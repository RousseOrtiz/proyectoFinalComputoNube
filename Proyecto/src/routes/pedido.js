const express = require('express');
const router = express.Router();

const Pedidos = require('../models/Pedidos');
const {isAuthenticated} = require('../helpers/auth');

router.get('/pedido/add', (req, res)=>{
    res.render('pedido/nPedido.hbs');
});

//Validar si no llena un campo
router.post('/pedido/nPedido' , async (req, res)=>{
    const {tipocafe, tueste, cantidadpaquetes, direccion} = req.body;
    const errors = [];
    if(!tipocafe){
        errors.push({text: 'Porfavor seleecione el tipo de café'});
    }
    if(!tueste){
        errors.push({text: 'Porfavor seleccione el tipo de tueste'});
    }
    if(!cantidadpaquetes){
        errors.push({text: 'Porfavor ingrese la cantidad de paquetes'});
    }
    if(!direccion){
        errors.push({text: 'Porfavor ingrese su dirección'});
    }
    if(errors.length > 0){
        res.render('pedido/nPedido', {
            errors,
            tipocafe,
            tueste,
            cantidadpaquetes,
            direccion
        });
    } else {
        const newPedido = new Pedidos({tipocafe, tueste, cantidadpaquetes, direccion});
        await newPedido.save(); //para decir que es asincrono
        res.redirect('/pedido');
        
        //res.send('Pedido exitoso')

    }
});

router.get('/pedido', async (req, res)=> {
  const pedido =  await Pedidos.find();
  res.render('pedido/all-pedidos', {pedido});
});

router.get('pedido/edit/:id',isAuthenticated,  async (req, res)=>{
   const pedido = await Pedidos.findById(req.params.id);
    res.render('pedido/editar-pedido', {pedido});
});

router.put('/pedido/editar-pedido/:id', isAuthenticated,  async (req, res)=>{
    const {tipocafe, tueste, cantidadpaquetes, direccion}=req.body;
   await Pedidos.findIdAndUpdate(req.params.id, {tipocafe, tueste, cantidadpaquetes, direccion});
   res.redirect('/pedido');
});


 router.delete('/pedido/delete/id', isAuthenticated, async(req, res)=>{
    await Pedidos.findByIdAndDelete(req.params.id);
     res.redirect('/pedidos');
 });

module.exports = router;





/*router.post('/pedido/nPedido', (req, res)=>{
  console.log(req.body);
  res.send('Pedido exitoso');
});


module.exports = router;*/