const Lodger = require("../models/lodger");

const index = (req, res) => {
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
        console.log(pgs.length);
        res.render('lodgerdashboard', {data : data, pgs : pgs});
    })
    .catch((err) => {
        res.json({err: err});
    });
}

module.exports = {
    index,
}