const NewUserModel = require('../../models/newusers')
const  FlightModel = require('../../models/flightDetails');


//login for already registered user
let CheckUser = function (username,password, successCB, errorCB) {
      userobj = {}
      userobj.username = username;
      userobj.password = password;
console.log(userobj,"userobj");
 NewUserModel.findOne({username:userobj.username,password : userobj.password},function(err,result){
  console.log(result,"result")
	 if(err){
	    errorCB(err);
		}
    // console.log(result.password)
    // if(result.password == userobj.password)
    //     successCB(result);
    else {
           console.log(result,"result in else")
          successCB(result);
    }
 })
};


//creating new user in newuser model
let NewUser = function (newuserobj, successCB, errorCB) {
	var users = new NewUserModel({
	username : newuserobj.username,
	password : newuserobj.password,
	emailId : newuserobj.emailId,
	MobileNumber : newuserobj.number
	});
	console.log('users: ', users)

	users.save(function (err, result) {
		console.log("entered into db");
		if(err) {
			//console.log(err);
			errorCB(err);
		}
		//console.log(result);
		successCB(result);
	});

};
//adding booked flights to the resp.users
  let BookedFlight = function(flightObj,successCB,errorCB){
       var obj = {}
        obj.source = flightObj.source
        obj.destination = flightObj.destination
        obj.date = flightObj.date
        obj.seats = flightObj.seats
        //console.log(obj)
           NewUserModel.update({username:flightObj.username},
      { $push: { BookedFlights: obj } },function(err,result){
        if(err){
          console.log(err)
          errorCB(err);
        }
        FlightModel.find({source:obj.source,destination:obj.destination},function(err,res){
          console.log("am inside")
          if(err){
            console.log(err)
            errorCB(err);
          }
          console.log(res)
          successCB(res);
        })

			 })

	}


module.exports ={
	 CheckUser,
	 NewUser,
   BookedFlight
}
