const Landlords = require('../models/landlord');
const PG = require('../models/pg');
//index

const index = (req, res) => {
    const userID = req.user.id;
    Landlords.findById(userID)
    .then((user) => {
        const data = {
            name : user.name,
            phone : user.phone,
            email : user.email,
            pgs : user.pgs,
        }
        res.render('landlorddashboard', {data : data});
    })
    .catch((err) => {
        res.send({err : err});
    })
}

// const addPg = (req, res) => {
//     const userID = req.user.id;
//     const pgData = {
//         pgname : req.body.pgname,
//         pgState : req.body.pgState,
//         pgCity : req.body.pgCity,
//         pgPincode : req.body.pgPincode,
//         pgPhone : req.body.pgPhone,
//         singleRoomPrice : req.body.singleRoomPrice,
//         doubleRoomPrice : req.body.doubleRoomPrice,
//         price : req.body.price,
//         images : req.file.filename,
//         comments : [],
//         RoomRequests : [],
//         ownerId : userID,
//     }
//     const pg = new PG(pgData);
//     pg.save()
//     .then((result) => {
//         Landlords.findById(userID)
//         .then((user) => {
//             user.pgs.push(result._id);
//             user.save()
//             .then((result) => {
//                 res.redirect('/landlorddashboard');
//             })
//             .catch((err) => {
//                 res.send({err : err});
//             })
//         })
//         .catch((err) => {
//             res.send({err : err});
//         })
//     })
//     .catch((err) => {
//         res.send({err : err});
//     })
// }

module.exports = {
    index,
}