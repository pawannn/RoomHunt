const PG = require('../models/pg');
const Landlords = require('../models/landlord');

const create = (req, res) => {
    const userID = req.user.id;
    const pgData = {
        pgname : req.body.pgname,
        pgState : req.body.pgState,
        pgCity : req.body.pgCity,
        pgPincode : req.body.pgPincode,
        pgAddress : req.body.pgAddress,
        pgType : req.body.pgType,
        pgPhone : req.body.pgPhone,
        singleRoomPrice : req.body.singleRoomPrice,
        doubleRoomPrice : req.body.doubleRoomPrice,
        price : req.body.price,
        ownerId : userID,
        comments : [],
        RoomRequests : [],
    }
    const pg = new PG(pgData);
    pg.save()
    .then((result) => {
        Landlords.findById(userID)
        .then((user) => {
            user.pgs.push(result._id);
            user.save()
            .then((result) => {
                res.redirect('/landlorddashboard');
                // res.json({message : "success"});
            })
            .catch((err) => {
                res.send({err : err});
            })
        })
        .catch((err) => {
            res.send({err : err});
        })
    })
    .catch((err) => {
        res.send({err : err});
    })
}

module.exports = {
    create,
}