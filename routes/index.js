var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Story = mongoose.model('stories');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/',ensureGuest,function(req,res){
    res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated,function(req,res){
    Story.find({user:req.user.id})
    .then(stories=>{
        res.render('index/dashboard',{
            stories:stories
        }); 
    });
    
});

router.get('/about',function(req,res){
    res.render('index/about');
});


module.exports = router;