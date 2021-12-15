const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/tienda-db-app', {  
})
.then(db => console.log('Base de datos conectada'))
.catch(err => console.error(err));
