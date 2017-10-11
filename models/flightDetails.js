var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var flightDetails = new Schema({

    flightname: {type: String, unique: false},
    source : String,
    destination : String,
    departs: Date,
    arrives: Date,
    stops : Number,
    price : Number,
    refundable : String,
    food : [String],
    capacity : Number

});

module.exports = mongoose.model('FlightDetails', flightDetails);
