const { db } = require('../db');

async function getPackages(params) {
    let packages = await db.collection('packages').get();
    packages = packages.docs.map((doc) => doc.data());
    return packages;
}

module.exports = {
    getPackages,
}