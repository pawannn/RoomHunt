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
            pgs : user.pgs, //array of pg ids
        }
        //now we will fecth all the pgs from the database using the pg ids
        PG.find({_id : {$in : data.pgs}})
        .then((pgs) => {
            data.pgs = pgs;
            console.log(data.pgs);
            res.render('landlorddashboard', {data : data});
        })
        .catch((err) => {
            res.send({err : err});
        });
    })
    .catch((err) => {
        res.send({err : err});
    })
}

module.exports = {
    index,
}