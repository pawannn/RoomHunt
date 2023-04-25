const Landlords = require('../models/landlord');

//index

const index = (req, res) => {
    const userID = req.user.id;
    Landlords.findById(userID)
    .then((user) => {
        const data = {
            name : user.name,
            phone : user.phone,
            email : user.email,
        }
        res.render('landlorddashboard', {data : data});
    })
    .catch((err) => {
        res.send({err : err});
    })
}

module.exports = {
    index,
}