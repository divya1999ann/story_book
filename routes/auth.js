var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/google',(passport.authenticate('google',{scope:['profile','email']})));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
});
router.get('/verify',(req,res)=>{
    if(req.user){
        console.log(req.user);
    }else{
        console.log('Not auth');
    }

});

router.get('/logout',(req,res)=>{
   req.logout();
   res.redirect('/');

});


module.exports = router;
