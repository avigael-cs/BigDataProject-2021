var csv_create = require('../items.csv');
var bigml_connect = require('./BigML.js');
var read_json = require('../BigML/readjson.js');
const bigml = require('bigml');
var axios = require('axios').default;
var ml;
async function bigml_process() {
    try {
        ml = await csv_create(function () { });
        ml = await bigml_connect(function () { });
        var obj_from_json = await read_json(function () { })
    }
    catch (err) {
        console.log(err);
    }
    finally {
       json_obj = JSON.stringify(obj_from_json)
       //axios - make HTTP requests from node. js from the browser
        await axios.post('http://localhost:3000/update_bigml',{
            package: json_obj,
        });
        console.log(obj_from_json);
    }
}
bigml_process();
