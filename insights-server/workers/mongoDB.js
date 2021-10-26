// export BIGML_USERNAME = avigael-cs
// export BIGML_API_KEY = 21b8f167c93e8cb5364258b164a64041c8535717
// export BIGML_CRED = "username=$BIGML_USERNAME;api_key=$BIGML_API_KEY"
// export BIGML_PROJECT = project/61768d0799dfe70754014923

const mongoose = require ('mongoose')
const mongoPath = 'mongodb+srv://dataBase:vNblIWm3JpxaEjJc@cluster0.ckqda.mongodb.net/dataMongo?retryWrites=true&w=majority'
//vNblIWm3JpxaEjJc

module.exports = async () =>{
  await mongoose.connect(mongoPath, {
    useNewUrlParser:true,
    useUnifiedTopology:true })
    return mongoose
}

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dbName = 'dataMongo';
const client = new MongoClient('21b8f167c93e8cb5364258b164a64041c8535717');
client.connect(function(err) {

  const db = client.db(dbName);
  const data = fs.readFileSync('out_file.json');
  const docs = JSON.parse(data.toString());
  
  db.collection('outCollection')
      .insertMany(docs, function(err, result) {
          if (err) throw err;
          console.log('Inserted docs:', result.insertedCount);
          client.close();
  });
});



// var Db = {

//   // 'CreateEvent' is used for connection to mongoDB and insert object to mongoDB
//   insertEvent_to_mongoDB: function (m) {
//       //--------- connecting to our DB ------------------
//       MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
//           if (err)
//               throw err;
        
//           var dbo = db.db("bigdata"); // name of the DB
    
//           // 'packageDB' is the name of the collection, 'insertOne' function get document(in oue case Json object)
//           //  and insert him to our collection (m is Json object).
//           dbo.collection("packageDB").insertOne(m, function (err, res) {
//               if (err)
//                   throw err;
//               else 
//                   // console.log("Event has been inserted to mongoDB");
//               db.close();
//           });
//       }); 
//   }, // End 'CreateEvent' (end connection to mongoDB and end insert object to mongoDB)


//   // 'DeleteEvent' is used for delete event from mongoDB
//   DeleteEvent: function (m) {
//       console.log('Delete Event: ' + m);
//   }, // End 'insertEvent_to_mongoDB' 


//   // 'UpdateEvent' is used for update a given event
//   UpdateEvent: function (m) {
//       console.log('Update Event ' + m);
//   }, // End 'UpdateEvent'



//   write_to_csv_mongoDB: function () {
//       MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
//           if (err)
//               throw err;
//           var dbo = db.db("Project");
//           dbo.collection("packageDB").find()
//           .toArray()
//           .then(products => {
//               create_CSV(products);
//             return products;
//           })
//           .catch(err => {
//             console.log(err);
//           });
 
//   }); 
// }} // End Db


// const Json2_CSV = require("json2csv").Parser;
// const fs = require("fs");
// const ws = fs.createWriteStream("./csv_bigml.csv");

// function create_CSV(data) {
//   const json2_csv = new Json2_CSV({ header : true });
//   const csv_data = json2_csv.parse(data);
//   fs.writeFile("./csv_bigml.csv",csv_data,function(error){
//       if(error)
//           throw error;
//       // console.log("Write to csv successfuly!");
//   });
// }


// module.exports = Db 










