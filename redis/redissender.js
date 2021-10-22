var express = require('express');
const { json } = require('mathjs');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
const { myPrediction } = require('./bigML');
var redisClient = redis.createClient();
var sub = redis.createClient()

module.exports.addToRedis = (param) => {
    var myObj = JSON.parse(param);
    // console.log("got a message: ",param)
     
    redisClient.set(key, JSON.stringify(myobj), function (err, res) {
        console.log(res);
    redisClient.publish("message", param);
});
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

redisClient.on('connect', function () {
    console.log('Sender connected to Redis');
});
server.listen(3001, function () {
    console.log('Sender is running on port 3001');
});
}
