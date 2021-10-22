//const { Console } = require('console');
var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var redis = require('redis');
const { myPrediction } = require('./bigML');
var redisClient = redis.createClient();
var sub = redis.createClient()
redisClient.subscribe('message');
app.get('/', (req, res) => res.send('Hello World!'))

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


redisClient.on("message", function (channel, data) {
    console.log("Got the Massage", data);
    var data = JSON.parse(data, function (key, value) {

        if (key == 'enter_section') {
            numOfpackages[value]++
            numOfpackages[0]++
            switch (value) 
            {}
        }
        // exit packages
        listOfDetails = [package_details1, package_details2, package_details3, package_details4, package_details5]
        for (var i = 0; i < 5; i++) {
            // exit(listOfDetails[i], i)
            for (var j = 0; j < listOfDetails[i].length; j++) {
                var myRandom = Math.random()
                if (myRandom < 0.0005) {
                    listOfDetails[i].splice(j, 1)
                    numOfpackages[0]--;
                    numOfpackages[i + 1]--;
                    totalexitpackages++;
                }
            }
        }
        module.exports.totalExitpackages = totalexitpackages;
        module.exports.packages = numOfpackages;
        module.exports.package_Gdetails1 = package_details1;
        module.exports.package_Gdetails2 = package_details2;
        module.exports.package_Gdetails3 = package_details3;
        module.exports.package_Gdetails4 = package_details4;
        module.exports.package_Gdetails5 = package_details5;

    });
});

redisClient.on('connect', function () {
    console.log('Reciver connected to Redis');
});
server.listen(6061, function () {
    console.log('reciver is running on port 6061');
});