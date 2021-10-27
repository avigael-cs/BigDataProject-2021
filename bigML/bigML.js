// BIGML_USERNAME=AfikPeretz
// export BIGML_API_KEY=143dcb7fa89214cb41e233c41a4b76d4cc7f856d
// export BIGML_CRED="username=$BIGML_USERNAME;api_key=$BIGML_API_KEY"
// export BIGML_PROJECT=project/61767a7d9193b91738013b15

var bigml = require('bigml');
var fs = require('fs');
var connection = new bigml.BigML('AfikPeretz', '143dcb7fa89214cb41e233c41a4b76d4cc7f856d')
var source = new bigml.Source(connection);
const redis = require('redis');
const BigSender = require('../simulator');
const broker = redis.createClient(6379,'127.0.0.1');

module.exports = async function bigml_connect(callback) {
  try {
    //take the csv file
    ok = await source.create('../BigML/items.csv', function (error, sourceInfo) {
      if (!error && sourceInfo) {
        // create dataset
        var dataset = new bigml.Dataset(connection);
        dataset.create(sourceInfo, function (error, datasetInfo) {
          if (!error && datasetInfo) {
            // create association
            var model = new bigml.Association(connection);
            model.create(datasetInfo, function (error, modelInfo) {
              if (!error && modelInfo) {
                // console.log(modelInfo)
                try {
                  var model = new bigml.Model(connection);
                  model.get(modelInfo.resource,
                    true,
                    'only_model=true;limit=-1',
                   async function (error, resource) {
                      if (!error && resource) {
                        //create file json
                        fs.writeFileSync('../BigML/dataset.json', JSON.stringify(resource, null, "  "));
                      }
                    });
                }
                catch (err) {
                  console.log(err);
                }
                finally {
                  return 1;
                }
              }
            });
          }
        });
      }
    });
  }
  catch (err) {
    console.log(err);
  }
  finally {
    console.log("create a json from bigml")
    callback();
    return 1
  }
}
