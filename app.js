var express = require('express');
var mongoose = require('mongoose');

var app= express();


app.get('/',function(req,res){
    res.send('hello');
});


var port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log(`Server started on ${port}`)
});
