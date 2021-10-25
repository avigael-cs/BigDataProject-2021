// export BIGML_USERNAME = avigael-cs
// export BIGML_API_KEY = 21b8f167c93e8cb5364258b164a64041c8535717
// export BIGML_CRED = "username=$BIGML_USERNAME;api_key=$BIGML_API_KEY"
// export BIGML_PROJECT = project/61768d0799dfe70754014923

const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
var fs = require('fs');//read file
const uri = "mongodb+srv://bigData2021:bigdata@cluster0.ckqda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const collection = "packagesDetails";

var db = null; // global variable to hold the connection

// Initialize connection once
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  db = client.db(dataBase).collection(collection);
  // Database connection is ready
  axios.post('http://localhost:3000/services', {
                    service: "mongoDB",
                    msg: "MongoDB is ready"
                });
});

var mongo = {
  onClose: function() {
    client.close();
    console.log("MongoDB: connection closed");
  },
  onEvent: function(packageEvent) {
      package = {
        id: packageEvent.id,
        items: packageEvent.items,
        price: packageEvent.price,
        size: packageEvent.size,
        dest: packageEvent.dest,
        from: packageEvent.from
      };
      db.insertOne(package, function(err, res) {
        if (err) throw err;
        console.log("mongoDB: 1 package inserted");
      });
    //}
  },

  dataToCSV: function () {
    db.find({}).toArray((err, data) => {
      if (err) throw err;
      // console.log(data);
      const json2csvParser = new Json2csvParser({ header: true });
      const csvData = json2csvParser.parse(data);
      fs.writeFile('../BigML/items.csv', csv, 'utf8', function (err){
            if (error) throw error;
        console.log("mongoDB: Write to simulatorData.csv successfully!");
      });
    });
  }
}

module.exports = mongo;