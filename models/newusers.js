var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newusers = new Schema({

    username: {type: String, unique: true},
    password: String,
    emailId : String,
    MobileNumber : Number,
    BookedFlights : [{
             source : String,
             destination : String,
             date : Date,
             seats : Number

    }]

});

module.exports = mongoose.model('NewUsers', newusers);
