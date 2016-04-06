'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var User = require('../api/users/user.model.js')

app.use(session({
    secret: 'tongiscool' // or whatever you like
}));

// app.use(function (req, res, next) {
//   if (!req.session.counter) req.session.counter = 0;
//   console.log('counter', ++req.session.counter);
//   next();
// });

app.use(function (req, res, next) {
    console.log('session', req.session);
    next();
});

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.post('/login', function(req, res, next){
	User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .exec()
    .then(function (user) {
    	// console.log(user)
        if (!user) {
            res.sendStatus(401);
        } else {
            req.session.userId = user._id;
            res.send(user)
            res.sendStatus(200);
        }
    })
    .then(null, next);
});

app.post('/signup', function(req, res, next){
	User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then(function (user) {
    	// console.log("somestring", user);
        if (!user) {
            res.sendStatus(401);
        } else {
            req.session.userId = user._id;
            res.send(user)
            res.sendStatus(200);
        }
    })
    .then(null, next);
});

app.get('/logout', function(req, res, next){

    console.log('app.get/logout')
	req.session.destroy()
	console.log("Session:", req.session)

});


app.get('/auth/me', function(req, res, next){

    console.log("app.get/auth/me")
    User.findOne({_id: req.session.userId})
    .exec()
    .then(function(user){
        console.log("THE USER:", user)
        if(user.email) { 
            res.send(user) 
        } else {
            res.status(404)
        }
    })
    .then(null, function(err){
        console.error(err)
    })


});

// $http.get('/auth/me')

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;


