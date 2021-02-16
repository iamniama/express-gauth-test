require('dotenv').config();
const session = require('express-session');
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
// 1 - environment
const isLoggedIn = require('./middleware/isLoggedIn');

// 2 - imports
const express = require('express');
//const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

// 3 - App set up
const app = express();
app.set('view engine', 'ejs');


// 4 - App Middleware (app.use)
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public/'));
app.use(require('morgan')('dev'));
const db=require('./models')
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  
// 5 - Routes (controllers)
/*
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
  });

*/
app.get('/', (req, res)=>{
    res.send(`Welcome to Gladoire. <a href="http://localhost:3000/protected">Normal Auth Protected Link<a> <br /><a href="http://localhost:3000/protected2">Super Auth Protected Link<a>`)
})


app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: 'failure'}), (req, res)=>{
            res.redirect('/')
        })

app.get('/protected', isLoggedIn, (req, res)=>{
    res.send("If you can see this, authentication is working...")
})

app.get('/protected2', isLoggedIn, (req, res)=>{
    if (req.user.user_level >= 3){
        res.send(`This route is also protected, and if you can see this, your access level is >= 3<br /><a href="http://localhost:3000/auth/logout">LOGOUT</a>`)
    }else {
        res.send(`you are not fully authorized for this page...<a href="http://localhost:3000/auth/logout">LOGOUT</a>`)
    }
})
app.get("/auth/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

app.get('/auth/google/success', (req, res)=>{
    res.send(`Success!!!`)
})

app.get('auth/google/failure', (req, res)=>{
    res.send(`FAIL!!!`)
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});