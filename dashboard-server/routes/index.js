const packageRoute = require('./package');

module.exports = app => {
    app.use('/packages', packageRoute);
}