//const { Console } = require('console');
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
const { myPrediction } = require('./bigML');
var redisClient = redis.createClient();
var sub = redis.createClient()/// subscribe ("message")
// publish("message")
redisClient.subscribe('message');
app.get('/', (req, res) => res.send('Hello World!'))



let all_the_packages=new Map();
var packages=[]
var total_packages_number = 0 ;


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

redisClient.publish("message",()=>{

})
redisClient.subscribe("package")
redisClient.on("message",(channel,message)=>{
    // on send

})


redisClient.on('connect', function () {
    console.log('Reciver connected to Redis');
});
server.listen(6061, function () {
    console.log('reciver is running on port 6061');
});