const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const uri = "mongodb+srv://bigData2021:bigdata@cluster0.ckqda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    
// async function main(){
//         /**
//          * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//          * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//          */
//          const uri = "mongodb+srv://bigData2021:bigdata@cluster0.ckqda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
     
    
//         const client = new MongoClient(uri);
     
//         try {
//             // Connect to the MongoDB cluster
//             await client.connect();
//             await listDatabases(client);
//             // Make the appropriate DB calls
//             await  listDatabases(client);
     
//         } catch (e) {
//             console.error(e);
//         } finally {
//             await client.close();
//         }
//     }
//     async function listDatabases(client){
//         const databasesList = await client.db().admin().listDatabases();
     
//         console.log("Databases:");
//         databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//     };

//     main().catch(console.error);
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
    //if(packageEvent.Event_type == "road exit") {
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
      fs.writeFile("simulatorData.csv", csvData, function(error) {
        if (error) throw error;
        console.log("mongoDB: Write to simulatorData.csv successfully!");
      });
    });
  }
}

module.exports = mongo;