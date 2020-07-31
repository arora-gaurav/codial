const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

// used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require(./config/passport-local-strategy);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

// Extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Use express router
app.use('/', require('./routes/index'));

// Setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100);
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, function(err){
    if(err){
        //Using String Interpolation using ` sign nd ${} to evaluate something
        console.log(`Error in the running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})