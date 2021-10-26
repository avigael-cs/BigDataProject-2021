// export BIGML_USERNAME = avigael-cs
// export BIGML_API_KEY = 21b8f167c93e8cb5364258b164a64041c8535717
// export BIGML_CRED = "username=$BIGML_USERNAME;api_key=$BIGML_API_KEY"
// export BIGML_PROJECT = project/61768d0799dfe70754014923

const MongoClient = require('mongodb').MongoClient;
const axios = require('axios');
var fs = require('fs');//read file
const uri = "mongodb+srv://bigData2021:bigdata@cluster0.ckqda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const collection = "packagesDetails";


var Db = {

  // 'CreateEvent' is used for connection to mongoDB and insert object to mongoDB
  insertEvent_to_mongoDB: function (m) {
      //--------- connecting to our DB ------------------
      MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
          if (err)
              throw err;
        
          var dbo = db.db("bigData2021"); // name of the DB
    
          // 'packageDB' is the name of the collection, 'insertOne' function get document(in oue case Json object)
          //  and insert him to our collection (m is Json object).
          dbo.collection("packageDB").insertOne(m, function (err, res) {
              if (err)
                  throw err;
              else 
                  // console.log("Event has been inserted to mongoDB");
              db.close();
          });
      }); 
  }, // End 'CreateEvent' (end connection to mongoDB and end insert object to mongoDB)


  // 'DeleteEvent' is used for delete event from mongoDB
  DeleteEvent: function (m) {
      console.log('Delete Event: ' + m);
  }, // End 'insertEvent_to_mongoDB' 


  // 'UpdateEvent' is used for update a given event
  UpdateEvent: function (m) {
      console.log('Update Event ' + m);
  }, // End 'UpdateEvent'



  ReadEvent: function (renderTheView) {
      var sum=0;
              //--------- connecting to our DB ------------------
      MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {

          if (err)
              throw err;

          var dbo = db.db("salesDb");

          dbo.collection("transactions").find({}, { projection: { _id: 0, quantity: 1 } }).toArray(function (err, result) {
              if (err)
                  throw err;
              console.log(result);
              sum = sumHelper(result);
              
              db.close();
              var packagedData = {
                  title: "אריאל",
                  totalSum: 1200,
                  percent: 0.8,
                  icon: "work"
              }
              renderTheView(packagedData);

          });
      });
  } ,// End 'ReadEvent'


  write_to_csv_mongoDB: function () {
      MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
          if (err)
              throw err;
              // {projection: {IsSpecial:0 }}
          var dbo = db.db("Project");
          dbo.collection("packageDB").find()
          .toArray()
          .then(products => {
              create_CSV(products);
            return products;
          })
          .catch(err => {
            console.log(err);
          });
  //         setTimeout(function(){create_CSV(result)}
  //             , delay);

  //   });
  }); 
}} // End Db


const Json2_CSV = require("json2csv").Parser;
const fs = require("fs");
const ws = fs.createWriteStream("./csv_bigml.csv");

function create_CSV(data) {
  const json2_csv = new Json2_CSV({ header : true });
  const csv_data = json2_csv.parse(data);
  fs.writeFile("./csv_bigml.csv",csv_data,function(error){
      if(error)
          throw error;
      // console.log("Write to csv successfuly!");
  });
}


module.exports = Db // we can use Db in other files 

// _dbo.collection("packages")










