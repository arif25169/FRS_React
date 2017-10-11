const router = require('express').Router();
const mongocontroller = require('./mongocontroller');
var jwt=require('jsonwebtoken');

router.post('/login', function(req,res){
  console.log("login post called me!!")
  console.log(req.body)
     try{
     	mongocontroller.CheckUser(req.body.username,req.body.password,function(status){
      console.log(status , "status")
      if(status !== 'null')
        var token=jwt.sign(status,'mysecretKey');//res.json({token:token}); passing the token to client
     		console.log(token,"token")
        res.status(200).json({token:token});
     	},
     	function(err){
     		res.status(500).json({error:'No User found'});
     	});
     }
     catch(err){
     	res.status(500).json({
     		error:'Internal Error'
     	});
     }
 })

 router.get('/verifyusers',function(req,res){
   try{
        let token = req.headers.authorization
        jwt.verify(token,"mysecretKey",(err,decod)=>{
         //console.log(decod,"decod")
         res.send({userobj:decod._doc})
})
   } catch(err) {
     res.status(500).json({
       error: 'Internal error occurred, please report...!'
     });
   }
 });

 router.post('/newuser', function(req,res){
   console.log("handleCreateUser post called me!!")
      try{
      	mongocontroller.NewUser(req.body.newuserobj,function(status){
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

  router.post('/flights', function(req,res){
    //console.log(req.body.flightObj)
    try{
      mongocontroller.BookedFlight(req.body.flightObj,function(status){
        console.log(status,"status in mongo controller")
        res.status(200).json(status);
      },
      function(err){
        res.status(500).json({error:'cannot book flight to the user'});
      });
    }
    catch(err){
      res.status(500).json({
        error:'Internal Error'
      });
    }
  })

module.exports = router;
