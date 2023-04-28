const Landlords = require('../models/landlord');
const PG = require('../models/PG');

const create = (req, res) => {
    const userID = req.user.id;
    const Data = {
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
    const pg = new PG(Data);
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

const delete_pg = (req, res) => {
    const pgID = req.params.id;
    const userID = req.user.id;
    PG.findById(pgID).
    then((pg) => {
        if(pg.ownerId != userID){
            res.send({err : "You are not the owner of this PG"});
        }
        else{
            PG.findByIdAndDelete(pgID)
            .then((result) => {
                Landlords.findById(userID)
                .then((user) => {
                    user.pgs = user.pgs.filter(pg => pg != pgID);
                    user.save()
                    .then((result) => {
                        res.redirect('/landlorddashboard');
                    })
                    .catch((err) => {
                        res.send({err : err});
                    })
                })
                .catch((err) => {
                    res.send({err : err});
                })
            })
        }
    })
    .catch((err) => {
        res.send({err : err});
    })
}

const update_pg = (req, res) => {
    const pgID = req.params.id;
    const userID = req.user.id;
    console.log(userID);
    PG.findById(pgID)
    .then((pg) => {
        console.log(pg.ownerId);
        if(pg.ownerId == userID){
            console.log(2);
            const Data = {
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
            }
            PG.findByIdAndUpdate(pgID, Data)
            .then((result) => {
                console.log(3);
                res.redirect('/landlorddashboard');
            })
            .catch((err) => {
                console.log(5);
                res.send({err : err});
            })
        }
        else{
            console.log(6);
            res.send({err : "You are not the owner of this PG"});
        }
    })
    .catch((err) => {
        console.log(7);
        res.send({err : err});
    })
}

module.exports = {
    create,
    delete_pg,
    update_pg,
}