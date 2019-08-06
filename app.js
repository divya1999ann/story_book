var express = require('express');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');


//load user model
require('./models/User');
var User = mongoose.model('users');

require('./config/passport')(passport);

//load routes
var index = require('./routes/index');
var auth = require('./routes/auth');


var app= express();
//
app.engine('handlebars', exphbs({
    defaultLayout:'main'
}));
app.set('view engine','handlebars');

//map global promise
mongoose.Promise=global.Promise;

//connect to mongoose
mongoose.connect('mongodb://localhost/sb-dev',{
    useNewUrlParser: true
})
.then(function(){
    console.log('MongoDB Connected...');
})
.catch(err=>console.log(err));

//pasport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(cookieParser());
  app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    }));

 //set global vars
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
});



//use routes
app.use('/',index);
app.use('/auth',auth);


var port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log(`Server started on ${port}`);

});