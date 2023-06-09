const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lodgerSchema = new Schema({
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
    savedpgs : {
        type : Array,
    }
}, {timestamps : true});

const Lodger = mongoose.model('lodger', lodgerSchema);

module.exports = Lodger;