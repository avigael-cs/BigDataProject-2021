const Router = require('express-promise-router');
const { getPackages } = require('../model/package');
const router = new Router();

module.exports = router;

router.get('/', async (req, res, next) => {
  const packages = await getPackages();
  res.send(packages);
});