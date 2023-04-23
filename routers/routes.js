const express1 = require('express');

const router = express1.Router();

const Ninja1 = require('../models/ninja');



router.get('/ninjas', (req,res,next)=>{
  
    Ninja1.find({}).then((ninja1)=>{
        res.send(ninja1);
    });

    // Ninja1.aggregate().near({
    //     near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    //     maxDistance: 100000,
    //     spherical: true,
    //     distanceField: "dis"
    // }).then((ninja1)=>{
    //     res.send(ninja1);
    // });

})

router.post('/ninjas', (req,res,next)=>{
  
    // var ninja1 = new Ninja1(req.body);  // This is the old way
    // ninja1.save();
   
    Ninja1.create(req.body).then((ninja1)=>{
        res.send(ninja1);
    });
     

})

router.put('/ninjas/:id', (req,res,next)=>{
    Ninja1.findByIdAndUpdate({_id:req.params.id},req.body).then(()=>{
        Ninja1.findOne({_id:req.params.id}).then((ninja1)=>{
            res.send(ninja1);
        });
    });

})

router.delete('/ninjas/:id', (req,res,next)=>{
   
    Ninja1.findByIdAndRemove({_id:req.params.id}).then((ninja1)=>{
        res.send(ninja1);
    });
    

})

//api with search

router.get('/ninjas/find', (req, res, next) => {
    const beltcolor = req.query.beltcolor;
    Ninja1.find({ rank: beltcolor }).then((ninjas) => {
      res.send(ninjas);
    }).catch((error) => {
      next(error);
    });
  });

  //api with sorting

  router.get('/ninjas/sort', (req, res, next) => {
    const beltcolor = req.query.beltcolor;
    Ninja1.find({ rank: beltcolor }).sort('rank').then((ninjas) => {
      res.send(ninjas);
    }).catch((error) => {
      next(error);
    });
  });
  
  //api with pagination

  router.get('/ninjas/paged', (req, res, next) => {
    const beltcolor = req.query.rank;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    Ninja1.find({ rank: beltcolor }).skip(skip).limit(limit)
      .then((ninjas) => {
        res.send(ninjas);
      }).catch((error) => {
        next(error);
      });
  });


module.exports = router;