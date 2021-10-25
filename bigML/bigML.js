// BIGML_USERNAME=AfikPeretz
// export BIGML_API_KEY=143dcb7fa89214cb41e233c41a4b76d4cc7f856d
// export BIGML_CRED="username=$BIGML_USERNAME;api_key=$BIGML_API_KEY"
// export BIGML_PROJECT=project/61767a7d9193b91738013b15


const bigml = require("bigml");
const Parserjsoncsv = require('json2csv');
const fs = require('fs');
const connectionBigml = new bigml.BigML('AfikPeretz', '143dcb7fa89214cb41e233c41a4b76d4cc7f856d')
const bigmlModel = new bigml.Model(connectionBigml)



        catch (err) {
            console.error(err)
        }
    

module.exports = BigMLHandler
module.exports.startUpdating = startUpdating