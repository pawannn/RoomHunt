const Lodger = require("../models/lodger");
const PG = require("../models/PG");
const Landlord = require("../models/landlord");

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

const pg_get = (req, res) => {
    const pgID = req.params.id;
    PG.findById(pgID)
    .then((pg) => {
        pgdata = pg;
        Landlord.findById(pg.ownerId)
        .then((landlord) => {
            const userID = req.user.id;
            Lodger.findById(userID)
            .then((user) => {
                const lodger_data = user;
                lodger_data.saved = false;
                if(user.savedpgs.includes(pgID)) {
                    lodger_data.saved = true;
                }
                res.render('lodgerpgdetails', {pg : pgdata, landlord : landlord, lodger : lodger_data});
            })
            .catch((err) => {
                res.send({err : err});
            })
        })
        .catch((err) => {
            res.send({err : err});
        })
    })
    .catch((err) => {
        res.send({err : err});
    });    
}

const roomrequest = (req, res) => {
    const lodgername = req.body.lodgername;
    const lodgeremail = req.body.lodgeremail;
    const lodgerphone = req.body.lodgerphone;
    const lodgerId = req.user.id;
    const pgid = req.params.id;
    console.log(pgid)
    PG.findById(pgid)
    .then((pg) => {
        console.log(pg);
        pg.RoomRequests.push({lodgername : lodgername, lodgeremail : lodgeremail, lodgerphone : lodgerphone, lodgerId : lodgerId});
        pg.save()
        .then((pg) => {
            res.redirect('/lodgerdashboard/pg/' + pgid);
        })
        .catch((err) => {
            res.send({err : err});
        })
    })
}

const savepg = (req, res) => {
    const userId = req.user.id;
    Lodger.findById(userId)
    .then((user) => {
        user.savedpgs.push(req.params.id);
        user.save()
        .then((user) => {
            res.redirect('/lodgerdashboard/pg/' + req.params.id + '/');
        })
        .catch((err) => {
            res.send({err : err});
        })
    })
    .catch((err) => {
        res.send({err : err});
    })
}

const comment = (req, res) => {
    const comment = req.body.comment;
    const author = req.body.author;
    const pgId = req.params.id;
    PG.findById(pgId)
    .then((pg) => {
        pg.comments.push({comment : comment, author : author});
        pg.save()
        .then((pg) => {
            res.redirect('/lodgerdashboard/pg/' + pgId);
        })
        .catch((err) => {
            res.send({err : err});
        })
    })
    .catch((err) => {
        res.send({err : err});
    })
}

const get_saved = (req, res) => {
    const userId = req.user.id;
    Lodger.findById(userId)
    .then((user) => {
        const savedpgs = user.savedpgs;
        PG.find({_id : {$in : savedpgs}})
        .then((pgs) => {
            console.log(pgs.RoomRequests);
            // res.json({pgs : pgs})
            res.render('lodgersavedpgs', {pgs : pgs});
        })
        .catch((err) => {
            res.send({err : err});
        })
    })
}

module.exports = {
    index_get,
    index_post,
    pg_get,
    roomrequest,
    savepg,
    comment,
    get_saved
}