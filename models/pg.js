const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pgSchema = new Schema({
    pgname : {
        type : String,
        required : true,
    },
    pgType : {
        type : String,
        required : true,
    },
    pgState : {
        type : String,
        required : true,
    },
    pgCity : {
        type : String,
        required : true,
    },
    pgPincode : {
        type : String,
        required : true,
    },
    pgAddress : {
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
    },
    RoomRequests : {
        type : Array,
    },
    ownerId : {
        type : String,
        required : true,
    }
}, {timeStamps : true});

const PG = mongoose.model('pgData', pgSchema);

module.exports = PG;