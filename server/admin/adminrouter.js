const router = require('express').Router();
const adminmongocontroller = require('./adminmongocontroller');



router.post('/addflights', function(req,res){
  console.log(req.body.flightdetailObj)
     try{
       console.log("inside try")
       adminmongocontroller.NewFlight(req.body.flightdetailObj,function(status){
         res.status(200).json(status);
       },
       function(err){
         res.status(500).json({error:'cannot create user'});
       });
     }
     catch(err){
       res.status(500).json({
         error:'Internal Error'
       });
     }
 })

 router.post('/updateflight', function(req,res){
   console.log(req.body.flight)
      try{
        console.log("inside try")
        adminmongocontroller.UpdateFlight(req.body.flight,function(status){
          console.log(status)
          res.status(200).json(status);
        },
        function(err){
          res.status(500).json({error:'cannot update flight'});
        });
      }
      catch(err){
        res.status(500).json({
          error:'Internal Error'
        });
      }
  })


  router.post('/deleteflight', function(req,res){
    console.log(req.body.flight)
       try{
         console.log("inside try")
         adminmongocontroller.DeleteFlight(req.body.flight,function(status){
           console.log(status)
           res.status(200).json(status);
         },
         function(err){
           res.status(500).json({error:'cannot delete flight'});
         });
       }
       catch(err){
         res.status(500).json({
           error:'Internal Error'
         });
       }
   })


   router.get('/allflights',function(req,res){
     console.log('am here')
     try{
       console.log("inside try")
         adminmongocontroller.getAllFlights(function (flights) {
           console.log(flights)
         res.status(201).json(flights);

       }, function (err) {
         logger.error('Get All flights Error: ', err);
         res.status(500).json({error: 'Cannot get all flights from mongo...!'});
       });
     } catch(err) {
       res.status(500).json({
         error: 'Internal error occurred, please report...!'
       });
     }
   });
module.exports = router;
