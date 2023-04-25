const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const landLordSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    pgs : {
        type : Array,
    }

}, {timestamps : true});

const Landlord = mongoose.model('landlord', landLordSchema);

module.exports = Landlord;