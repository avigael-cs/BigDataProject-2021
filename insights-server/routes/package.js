const Router = require('express-promise-router');
const packageModel = require('../model/package');
const router = new Router();

module.exports = router;

router.get('/packages', async (req, res, next) => {
    // const email = req.body.email;
    // const password = req.body.password;
    //
    // if(!email || ! password) {
    //     res.status(400);
    //     res.send("Missing email or password");
    //     return;
    // }
});