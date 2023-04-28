const Lodger = require("../models/lodger");
const PG = require("../models/PG");

const index_get = (req, res) => {
    const userID = req.user.id;
    Lodger.findById(userID)
    .then((user) => {
        const data = {
            name : user.name,
            email : user.email,
            phone : user.phone,
            savedpgs : user.savedpgs,
        }
        const pgs = [];
        res.render('lodgerdashboard', {data : data, pgs : pgs});
    })
    .catch((err) => {
        res.json({err: err});
    });
}

const index_post = (req, res) => {
    const userID = req.user.id;
    const pgState = req.body.pgState;
    const pgCity = req.body.pgCity;
    const pgPricelimit = req.body.pricelimit;
    const pgType = req.body.pgType;
    PG.find({pgState : pgState, pgCity : pgCity, price : {$lte : pgPricelimit}, pgType : pgType})
    .then((pgs) => {
        Lodger.findById(userID)
        .then((user) => {
            res.render('lodgerdashboard', {pgs : pgs, data : user});
        });
    })
    .catch((err) => {
        res.send({err : err});
    })
}

module.exports = {
    index_get,
    index_post,
}