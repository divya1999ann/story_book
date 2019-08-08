var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Story = mongoose.model('stories');
var User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


router.get('/',(req,res)=>{
    Story.find({status:'Public'})
    .populate('user')
    .then(stories=>{
    res.render('stories/index',{
          stories:stories
    });
      
    });
});

//show single story
router.get('/show/:id',ensureAuthenticated,(req,res)=>{
    Story.findOne({
        _id:req.params.id
    })
    .populate('user')
    .populate('comments.commentUser')
    .then(story=>{
        res.render('stories/show',{
            story:story
        });
    });
});


router.get('/add',ensureAuthenticated, (req,res)=>{
    res.render('stories/add');
});

//edit form
router.get('/edit/:id',ensureAuthenticated, (req,res)=>{
    Story.findOne({
        _id:req.params.id
    })
   
    .then(story=>{
        res.render('stories/edit',{
            story:story
        });
    });
    
    
});

// add story
router.post('/',(req,res)=>{
   let allowComments;
   if(req.body.allowComments){
       allowComments=true;
   }else{
    allowComments=false;
   }
   var newStory={
       title:req.body.title, 
       body:req.body.body,
       status: req.body.status,
       allowComments: allowComments,
       user: req.user.id
   }

   //create story
   new Story(newStory)
   .save()
   .then(story=>{
       res.redirect(`/stories/show/${story.id}`);
   });
});

//edit form process
router.put('/:id',(req,res)=>{
    Story.findOne({
        _id:req.params.id
    })
   
    .then(story=>{
        let allowComments;
   if(req.body.allowComments){
       allowComments=true;
   }else{
    allowComments=false;
   }
      story.title = req.body.title;
    story.body = req.body.body;
    story.status = req.body.status;
    story.allowComments = allowComments;
    

    story.save()
    .then(story=>{
        res.redirect('/dashboard');
    });
    });
});

//delete story
router.delete('/:id',(req,res)=>{
  Story.remove({_id:req.params.id})
  .then(()=>{
      res.redirect('/dashboard');
  });
});

//add comment
router.post('/comment/:id',(req,res) =>{
    Story.findOne({
  _id:req.params.id
    })
    .then(story=>{
        const newComment ={
            commentBody:req.body.commentBody,
            commentUser: req.user.id
        }

        //push to cpmments array
        story.comments.unshift(newComment);
        story.save()
        .then(story=>{
          res.redirect(`/stories/show/${story.id}`);
        });
    });
});

module.exports = router;