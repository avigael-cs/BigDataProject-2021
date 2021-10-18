const package = require('./package');

module.exports = app => {
    app.use('/package', package);
}