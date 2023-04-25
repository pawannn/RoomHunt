const jwt = require('jsonwebtoken')

const landlord_Authentication = (req, res, next) => {
    try{
        const access_token = req.cookies.landlord_access_token;
        if(access_token){
            const decode = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
            req.user = decode
            next();
        }
        else{
            res.json({message: "Token not found"});
            // res.redirect('/login')
        }
            
    }
    catch(err) {
        if(err.name == 'TokenExpiredError'){
            res.json({err: "Token Expired"});
            // res.redirect('/login')
        }
        else {
            res.json({err: err});
        }
    }
    
}

const lodger_Authentication = (req, res, next) => {
    try{
        const access_token = req.cookies.lodger_access_token;
        if(access_token){
            const decode = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
            req.user = decode
            next();
        }
        else{
            res.json({message: "Token not found"})
            // res.redirect('/login')
        }
    }
    catch(err) {
        if(err.name == 'TokenExpiredError'){
            res.json({err: "Token Expired"});
            // res.redirect('/login')
        }
        else {
            res.json({err: err});
        }
    }
    
}

module.exports = {
    landlord_Authentication,
    lodger_Authentication
}