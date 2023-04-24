const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const landLordSchema = new Schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
}, {timestamps : true});

const Landlord = mongoose.model('landlord', landLordSchema);

module.exports = Landlord;