var mongoose = require('mongoose');
var Schema= mongoose.Schema;

//craete schema
var UserSchema = new Schema({
    googleID:{
        type:String,
        required:true //since only google authentication is used
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String
        },
    lastName:{
            type:String
        },
    image:{
            type:String
        }
});


//craete collection and add schema
mongoose.model('users',UserSchema);