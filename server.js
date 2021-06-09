
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
//npm install concurrently
const session = require('express-session');
const passport = require('passport');



const userRouter = require('./routers/userRouter');
const carRouter = require('./routers/carRouter');

const port = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(bodyParser.json())

app.use(session({
    secret: "Account Secret.",
    resave: false,
    saveUninitialized: false
}));


//initialize passport
app.use(passport.initialize());
//tell app to use passport to setup session
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/testDB',
{useNewUrlParser: true,
useUnifiedTopology: true});

//
mongoose.set("useCreateIndex", true);


const userModel = require('./models/userModel')
passport.use(userModel.createStrategy());


//create cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});


//destroy cookie
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.use('/users', userRouter);
app.use('/cars', carRouter);


app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});