//landLord_register, landLord_login, lodger_register, lodger_login
const Landlords = require('../models/landlord');
const Lodgers = require('../models/lodger');

const landLord_register = (req, res) => {
    const email  = req.body.newemail;
    const password = req.body.newpassword;
    const confirmPassword = req.body.confirmpassword;
    const passwordre = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
    const isValid = passwordre.test(password);
    if(isValid){
        if(password == confirmPassword){
            const landlord = new Landlords({email, password})
            landlord.save()
            .then((result) => {
                res.json({message: 'Data saved'});
            })
            .catch((err) => {
                res.json({err: err});
            });
        }
        else {
            res.json({message: 'Passwords do not match'})
        }
    }
    else {
        res.json({message: 'Password Invalid'})
    }
}

const landLord_login = (req, res) => {

}

const lodger_register = (req, res) => {

}

const lodger_login = (req, res) => {

}

module.exports = {
    landLord_login,
    landLord_register,
    lodger_login,
    landLord_register
}