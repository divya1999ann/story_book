var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('index/welcome');
});

router.get('/dashboard',function(req,res){
    res.send('Dashboard');
});

module.exports = router;