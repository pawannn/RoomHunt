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

//temporary

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

//404 Route
app.use((req, res) => {
    res.status(404).render('404')
});