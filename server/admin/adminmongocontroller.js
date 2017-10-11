const  FlightModel = require('../../models/flightDetails');
const mongoose = require('mongoose');
const UserModel = require('../../models/newusers');

let NewFlight = function (flightdetailObj, successCB, errorCB) {
	console.log(flightdetailObj)
	var flight = new FlightModel({
    flightname : flightdetailObj.flightname ,
    departs : flightdetailObj.departs,
    arrives : flightdetailObj.arrives,
    stops : flightdetailObj.stops,
    price : flightdetailObj.price,
    refundable : flightdetailObj.refundable,
    food : flightdetailObj.food,
		source : flightdetailObj.source,
		destination : flightdetailObj.destination,
		capacity : flightdetailObj.capacity
	});
	console.log('flight: ', flight)

	flight.save(function (err, result) {
		console.log("entered into db");
		if(err) {
			console.log(err);
			errorCB(err);
		}
		console.log(result);
		successCB(result);
	});

};

 let UpdateFlight = function(flight,successCB,errorCB){
	 console.log(flight)
	 console.log(flight.id)
	 let id = new mongoose.mongo.ObjectId(flight.id);
	 console.log(id)
	 FlightModel.update({_id : id},
		 {$set:{flightname :flight.flightname,
			      source:flight.source,
					  destination:flight.destination,
						departs: flight.departs,
						arrives: flight.arrives,
						stops : flight.stops,
						price : flight.price,
						refundable : flight.refundable,
						food : flight.food,
						capacity : flight.capacity }},function(err,result){
							if(err)
							  errorCB(err)
								else {
									console.log(result)
									successCB(result);
								}
						})
 }

let DeleteFlight = function(flight,successCB,errorCB){
	     FlightModel.remove({flightname:flight.flightname,source:flight.source,destination : flight.destination},function(err,res){
				 if(err){
				 console.log(err)
				 errorCB(err)
			 }
				 else {
         UserModel.remove({flightname:flight.flightname,source:flight.source,destination : flight.destination},function(err,res){
          if(err){
						errorCB(err);
					}
					else{
					successCB(res);
				}
			 })
		 }
			  })
 }

// get all flights
let getAllFlights = function (successCB, errorCB) {
	console.log('getAllFlights')
        FlightModel.find({}, function (err, result) {
          if (err) {
            errorCB(err);
          }
					console.log(result)
          successCB(result);

        });
      };

module.exports = {
	  NewFlight,
		UpdateFlight,
		DeleteFlight,
		getAllFlights
	}
