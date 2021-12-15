const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars')
const methodOverride= require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const exp = require('constants');
const passport = require('passport');

//Inicializamos 
const app= express();
require('./database');
require('./config/passport');


//settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDirs: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', 'handlebars');

app.set('view engine', '.hbs');



//middlewares 
app.use(express.urlencoded({extended: false})); //para recibir datos
app.use(methodOverride('_method'));
app.use(session({
    secret: 'appsecret',
    resave: true,
    saveUninitialized: true
}));
app.use('/img', express.static('img'));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//global variables 
app.use((req, res, next) =>{
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.usuario || null;
    next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/pedido'));
app.use(require('./routes/users'));


//static files 
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static('pro'));


//server is listenning 
app.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto', app.get('port'));
});
