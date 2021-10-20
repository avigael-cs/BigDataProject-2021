const { Console } = require('console');
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
var numOfCars = [0, 0, 0, 0, 0, 0]
var car_details1 = [];
var car_details2 = [];
var car_details3 = [];
var car_details4 = [];
var car_details5 = [];
var totalexitCars = 0 ;

redisClient.on("message", function (channel, data) {
    console.log("Got the Massage", data);
    var data = JSON.parse(data, function (key, value) {
        if (key == 'enter_section') {
            numOfCars[value]++
            numOfCars[0]++
            switch (value) {
                case 1:
                    car_details1.push(JSON.parse(data));
                    break;
                case 2:
                    car_details2.push(JSON.parse(data));
                    break;
                case 3:
                    car_details3.push(JSON.parse(data));
                    break;
                case 4:
                    car_details4.push(JSON.parse(data));
                    break;
                case 5:
                    car_details5.push(JSON.parse(data));
                    break;
                default:
            }
        }
        // exit cars
        listOfDetails = [car_details1, car_details2, car_details3, car_details4, car_details5]
        for (var i = 0; i < 5; i++) {
            // exit(listOfDetails[i], i)
            for (var j = 0; j < listOfDetails[i].length; j++) {
                var myRandom = Math.random()
                if (myRandom < 0.0005) {
                    listOfDetails[i].splice(j, 1)
                    numOfCars[0]--;
                    numOfCars[i + 1]--;
                    totalexitCars++;
                }
            }
        }
        module.exports.totalExitCars = totalexitCars;
        module.exports.cars = numOfCars;
        module.exports.car_Gdetails1 = car_details1;
        module.exports.car_Gdetails2 = car_details2;
        module.exports.car_Gdetails3 = car_details3;
        module.exports.car_Gdetails4 = car_details4;
        module.exports.car_Gdetails5 = car_details5;

    });
});
function exit(myList, j) {

}
redisClient.on('connect', function () {
    console.log('Reciver connected to Redis');
});
server.listen(6061, function () {
    console.log('reciver is running on port 6061');
});