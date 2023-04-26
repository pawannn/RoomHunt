const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/');
    },
    filename : function(req, file, cb){
        const extention = path.extname(file.originalname);
        cb(null, Date.now() + extention);
    }
});

const upload = multer({
    storage : Storage,
    fileFilter : function(req, file, callback){
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
            callback(null, true);
        }
        else{
            callback(null, false);
        }
    },
    limits : 1024 * 1024 * 2,
});

module.exports = upload;