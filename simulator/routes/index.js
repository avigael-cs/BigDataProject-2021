const packageRouter = require('./package');

module.exports = app => {
    app.use('/package', packageRouter);
}