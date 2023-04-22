const express1 = require('express');

const router = express1.Router();

const Ninja1 = require('../models/ninja');



router.get('/ninjas', (req,res,next)=>{
  
    // Ninja1.find({}).then((ninja1)=>{
    //     res.send(ninja1);
    // });

    Ninja1.geoNear(
        {type:'Point', coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
        {maxDistance:100000, spherical:true}
    ).then((ninja1)=>{
        res.send(ninja1);
    });
    

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

module.exports = router;