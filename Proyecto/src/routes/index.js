const express = require('express');
const router = express.Router();

router.get('/index', (req, res) =>{
    res.render('users/index.hbs');
});

router.get('/about', (req, res) =>{
    res.render('users/about.hbs')
});
router.get('/', (req, res) =>{
    res.render('users/index.hbs');
});
module.exports = router;
