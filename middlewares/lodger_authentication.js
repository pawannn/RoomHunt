const jwt = require('jsonwebtoken')

const Authentication = (req, res, next) => {
    try{
        const access_token = req.cookies.lodger_access_token;
        if(access_token){
            const decode = jwt.verify(access_token, 'access_token_secret')
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

module.exports = Authentication