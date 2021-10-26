// BIGML_USERNAME=AfikPeretz
// export BIGML_API_KEY=143dcb7fa89214cb41e233c41a4b76d4cc7f856d
// export BIGML_CRED="username=$BIGML_USERNAME;api_key=$BIGML_API_KEY"
// export BIGML_PROJECT=project/61767a7d9193b91738013b15


const bigml = require("bigml");
const Parserjsoncsv = require('json2csv');
const fs = require('fs');
const connectionBigml = new bigml.BigML('AfikPeretz', '143dcb7fa89214cb41e233c41a4b76d4cc7f856d')
const bigmlModel = new bigml.Model(connectionBigml)


var matrix = [];
for(var i=0; i<5; i++) {
    matrix[i] = [];
    for(var j=0; j<5; j++) {
        matrix[i][j] = 0;
    }
}

const mongo=require('../Mongo/mongo');

// var source = new bigml.Source(connection);
// source.create("./csv_bigml.csv", function(error, sourceInfo) {
//   if (!error && sourceInfo) {
//     var dataset = new bigml.Dataset();
//     dataset.create(sourceInfo, function(error, datasetInfo) {
//       if (!error && datasetInfo) {
//         var model = new bigml.Model();
//         model.create(datasetInfo, function (error, modelInfo) {
//           if (!error && modelInfo) {
//             var prediction = new bigml.Prediction();
//             prediction.create(modelInfo, {"": ""})

//           }
//         });
//       }
//     });
//   }
// });



 

module.exports.get_predict=(event) =>{
var localModel = new bigml.LocalModel('model/61085252c1c0000b93094151',connection);
localModel.predict({"id":event.id,"items":event.items,"price":event.price,"size":event.size,"dest":event.dest,"from":event.from },
function(error, prediction) {
    // console.log(prediction.prediction)
   var  pred = parseInt(prediction.prediction)
   console.log(pred)

   matrix[pred-1][event.Section-1]++
    
});

module.exports.Matrix=matrix;

}

