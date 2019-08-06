var GoogleStrategy = require('passport-google-oauth20').Strategy;

var mongoose =require('mongoose');
var keys = require('./keys');

//load uaer 
var User = mongoose.model('users');

module.exports = function(passport){

passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      //proxy: true  -- when deploying on heruku 
    },(accessToken, refreshToken,profile,done)=> {
        // console.log(accessToken);
         //console.log(profile);
        var image = profile.photos[0].value;
        console.log(image);
        var newUser={
          googleID: profile.id,
          firstName:profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image:image
        }


      // check for existing user  
      User.findOne({
        googleID:profile.id

      }).then(user =>{
        if(user){
            done(null,user);
          }else{
            //create user
            new User(newUser)
            .save()
            .then(user=> done(null,user));
            
        }
      })
    })
 )
 passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
}