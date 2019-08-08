var mongoose = require('mongoose');
var Schema= mongoose.Schema;

//craete schema
var StorySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'public'
        },
    allowComments:{
            type:Boolean,
            default:true
        },
    body:{
        type:String,
        
    },
    comments:[{
            commentBody:{
                type:String,
                required:true
            },
            commentDate:{
                type:Date,
                default:Date.now()
            },
            commentUser: {
                type:Schema.Types.ObjectId,
                ref:'users'
            }
        }],
        user:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },
        date:{
            type:Date,
                default:Date.now

        }
});


//craete collection and add schema
mongoose.model('stories',StorySchema,'stories');