const Landlords = require('../models/landlord');
//index

const index = (req, res) => {
    res.render('landlorddashboard')
}

module.exports = {
    index
}