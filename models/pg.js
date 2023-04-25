const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pgSchema = new Schema({
    pgname : {
        type : String,
        required : true,
    },
    pgState : {
        type : String,
        required : true,
    },
    pgDistrict : {
        type : String,
        required : true,
    },
    pgArea : {
        type : String,
        required : true,
    },
    pgPincode : {
        type : String,
        required : true,
    },
    pgPhone : {
        type : String,
        required : true,
    },
    singleRoomPrice : {
        type : String,
    },
    doubleRoomPrice : {
        type : String,
    },
    price : {
        type : String,
    },
    images : {
        type : String,
    },
    comments : {
        type : Array
    }
}, {timeStamps : true});

const PG = mongoose.model('pgData', pgSchema);

module.exports = PG;