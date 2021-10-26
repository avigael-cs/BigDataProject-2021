// const { redis } = require("../redis");
// const mongoose = require ('mongoose')
// const mongoPath = 'mongodb+srv://dataBase:vNblIWm3JpxaEjJc@cluster0.ckqda.mongodb.net/dataMongo?retryWrites=true&w=majority'
// //vNblIWm3JpxaEjJc
// // const mongo = require('../mongoDB')
// // const userSchema = require('../schemas/user-schema')

// const processPackage = (message) => {
//   console.log("Id: %s. Data: %O", message[0], message[1]);
//   let newPackage;
//    try {
//   newPackage = JSON.parse(message[1][1]);
//   const newPackage ={
//             id: newPackage.id,
//             items: newPackage.items,
//             price: newPackage.price,
//             size: newPackage.size,
//             dest: newPackage.dest,
//             from: newPackage.from
//         }

// var Db = {

//   // 'CreateEvent' is used for connection to mongoDB and insert object to mongoDB
//   insertEvent_to_mongoDB: function (newPackage) {
//       //--------- connecting to our DB ------------------
//       MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
//           if (err)
//               throw err;
        
//           var dbo = db.db("bigdata"); // name of the DB
    
//           // 'packageDB' is the name of the collection, 'insertOne' function get document(in oue case Json object)
//           //  and insert him to our collection (newPackage is Json object).
//           dbo.collection("dataMongo").insertOne(newPackage, function (err, res) {
//               if (err)
//                   throw err;
//               else 
//                   // console.log("Event has been inserted to mongoDB");
//               db.close();
//           });
//       }); 
//   }, // End 'CreateEvent' (end connection to mongoDB and end insert object to mongoDB)



// } // End Db

// mongo.insertEvent_to_mongoDB(newPackage);


// module.exports = Db 
// } catch (e) {
//   console.log(`Failed to process package: ${e}`)
// }   
// };

// async function listenForPackages(lastId = "$") {
//   // `results` is an array, each element of which corresponds to a key.
//   // Because we only listen to one key (mystream) here, `results` only contains
//   // a single element. See more: https://redis.io/commands/xread#return-value
//   const results = await redis.xread("block", 0, "STREAMS", "sendPackages", lastId);
//   const [key, messages] = results[0];

//   messages.forEach(processPackage);

//   // Pass the last id of the results to the next round.
//   await listenForPackages(messages[messages.length - 1][0]);
// }

// module.exports = {
//   listenForPackages
// }





