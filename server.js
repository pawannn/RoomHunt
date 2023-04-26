//Required Node Packages
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config()

//Routers
const authRouter = require('./routes/authRoutes');
const landlordRoutes = require('./routes/landlordRoute');
const lodgerRoutes = require('./routes/lodgerRoute');

//authentication middleware
const Authentication = require('./middlewares/authentication');

//pg CRUD
const pgCRUDroute = require('./routes/pgCRUDroute');

//temporary models
const PG = require('./models/pg');
const upload = require('./middlewares/upload');
const Landlords = require('./models/landlord');

//server initilization
const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, (err, result) => {
    if(err) {
        console.log(result)
    }
    else{
        console.log('\nListening on port 3000...')
        console.log('http://localhost:3000/')
    }
});

//connect to db
mongoose.connect(process.env.dbURI)
.then((result) => {
    console.log('connected to database!')
})
.catch((err) => {
    console.log(err)
});

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('View', 'views')
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(cookieParser())

//routes
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/landlord', (req, res) => {
    res.render('landlord')
})

app.get('/lodger', (req, res) => {
    res.render('lodger')
});

app.get('/thankyou', (_, res) => {
    res.render('thankyou')
})

app.use('/api', authRouter);

app.use('/landlorddashboard', Authentication.landlord_Authentication, landlordRoutes);

app.use('/lodgerdashboard', Authentication.lodger_Authentication, lodgerRoutes);

app.use('/pgAPI', pgCRUDroute);

//temporary Routes
// app.post('/pgdetails', upload.single('images') ,(req, res) => {
//     const userID = req.body.ownerId;
//     const pgData = {
//         pgname : req.body.pgname,
//         pgState : req.body.pgState,
//         pgCity : req.body.pgCity,
//         pgPincode : req.body.pgPincode,
//         pgAddress : req.body.pgAddress,
//         pgType : req.body.pgType,
//         pgPhone : req.body.pgPhone,
//         singleRoomPrice : req.body.singleRoomPrice,
//         doubleRoomPrice : req.body.doubleRoomPrice,
//         price : req.body.price,
//         ownerId : userID,
//         comments : [],
//         RoomRequests : [],
//     }
//     if(req.file){
//         pgData.images = req.file.path;
//     }
//     const pg = new PG(pgData);
//     pg.save()
//     .then((result) => {
//         Landlords.findById(userID)
//         .then((user) => {
//             user.pgs.push(result._id);
//             user.save()
//             .then((result) => {
//                 res.json({message: 'Success'});
//             })
//             .catch((err) => {
//                 res.send({err : err});
//             })
//         })
//         .catch((err) => {
//             res.send({err : err});
//         })
//     })
//     .catch((err) => {
//         res.send({err : err});
//     })
// });

app.post('/deletepg', (req, res) => {
    const pgId = req.body.pgId;
    const ownerId = req.body.userId;
    PG.findByIdAndDelete(pgId)
    .then((result) => {
        console.log(1);
        Landlords.findById(ownerId)
        .then((user) => {
            console.log(2);
            user.pgs = user.pgs.filter(pg => pg != pgId);
            user.save()
            .then((result) => {
                console.log(3);
                res.json({message: 'Success'});
            })
            .catch((err) => {
                console.log(4);
                res.send({err : err});
            })
        })
        .catch((err) => {
            console.log(5);
            res.send({err : err});
        })
    })
    .catch((err) => {
        console.log(6);
        res.send({err : err});
    })
});

app.post('/find', (req, res) => {
    const userID = req.body.userId;
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    Landlords.findById(userID)
    .then((result) => {
        console.log(result);
        res.json({message : result})
    })  
    .catch((err) => {
        console.log(err);
    });
});


//404 Route
app.use((req, res) => {
    res.status(404).json({message: "404"})
});