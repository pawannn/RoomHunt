const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Landlords = require('../models/landlord');
const Lodgers = require('../models/lodger');
//landLord_register, landLord_login, lodger_register, lodger_login

const landLord_register = (req, res) => {
    const email  = req.body.newemail;
    Landlords.findOne({email: email})
    .then(data => {
        if(data){
            res.json({message: "User already registered"})
        }
        else{
            const password = req.body.newpassword;
            const confirmPassword = req.body.confirmpassword;
            const passwordre = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            const isValid = passwordre.test(password);
            if(isValid){
                if(password == confirmPassword){
                    bcrypt.hash(password, 10, function(err, hashed) {
                        if(err){
                            res.json({err: err})
                        }
                        else{
                            const landlord = new Landlords({email : email, password : hashed})
                            landlord.save()
                            .then((result) => {
                                // res.json({message: 'Data saved'});
                                res.redirect('/landlord')
                            })
                            .catch((err) => {
                                res.json({err: err});
                            });
                        }
                    })
                }
                else {
                    res.json({message: 'Passwords do not match'})
                }
            }
            else {
                res.json({message: 'Password Invalid'})
            }
        }
    })
    .catch(err => {
        res.json({err: err});
    });
}

const landLord_login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Landlords.findOne({email : email})
        .then((user) => {
            if(user){
                bcrypt.compare(password, user.password, function(err, decoded) {
                    if(err){
                        res.json({err: err})
                    }
                    else{
                        const token = jwt.sign({id: user._id}, 'access_token_secret', {expiresIn : '1h'});
                        res.cookie('landlord_access_token', token, {
                            httpOnly : true,
                            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                            sameSite: 'strict',
                        });
                        // res.json({
                        //     message: "authentication Successfull",
                        //     token
                        // });
                        res.redirect("/landlorddashboard")
                    }
                })
            }
            else{
                res.json({message: "User Not found"})
            }
        })
        .catch(err => {
            res.json({err: err})
        })
}

const landlord_logout = (req, res) =>{
    res.clearCookie('landlord_access_token').redirect('/landlord');
}

const lodger_register = (req, res) => {
    const newEmail = req.body.newemail;
    Lodgers.findOne({email : newEmail})
    .then((user) => {
        if(user){
            res.json({message: "User already exist"});
        }
        else{
            const newPassword = req.body.newpassword;
            const confirmPassword = req.body.confirmpassword;
            const passwordre = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            const isValid = passwordre.test(newPassword);
            if(isValid){
                if((newPassword == confirmPassword)){
                    bcrypt.hash(newPassword, 10, function(err, hashed) {
                        if(err){
                            res.json({err: err})
                        }
                        const lodger = new Lodgers({email : newEmail, password : hashed});
                        lodger.save()
                            .then((result) => {
                                res.json({message: "Data saved"});
                            })
                            .catch((err) => {
                                res.json({err: err})
                            })
                    })
                }
                else{
                    res.json({message: "Passwords Do not match"})
                }
            }
            else{
                res.json({message: "password Invalid"})
            }
        }
    })
}

const lodger_login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Lodgers.findOne({email: email})
    .then((user) => {
        if(user){
            bcrypt.compare(password, user.password, function(err, data) {
                if(err){
                    res.json({err: err});
                }
                else{
                    const access_token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "1h"});
                    res.cookie('lodger_access_token', access_token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        sameSite: 'strict',
                    }).json({
                        message: "Authentication Successfull",
                        access_token : access_token,
                    })
                }
            })
        }
        else{
            res.json({err: "user not found"});
        }
    })
    .catch((err) => {
        res.json({err: err})
    })
}

const lodger_logout = (req, res) => {
    res.clearCookie('lodger_access_token').json({message: "logged Out"})
}

module.exports = {
    landLord_login,
    landLord_register,
    landlord_logout,
    lodger_login,
    lodger_register,
    lodger_logout
}