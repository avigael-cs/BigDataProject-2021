const { redis } = require("../redis");

const processPackage = (message) => {
  console.log("Id: %s. Data: %O", message[0], message[1]);
  let newPackage;
  try {
    //json file of our package
    newPackage = JSON.parse(message[1][1]);

    //start sending to mongo
    //mongo is connection to our database
    const mongo = require('./mongoDB')
    //schema of our package
    const userSchema = require('./schemas/user-schema')
    
      mongo().then(async (mongoose) => {
          try{
              console.log('connect to mongo')

              //insert data to mongo db, databas name is dataMongo, collection is dataBase
              await new userSchema(newPackage).save()
          }finally{
            //close connection to mongo
              mongoose.connection.close()
              console.log('disconnect')
  
          }
      })
    
  } catch (e) {
    console.log(`Failed to process package: ${e}`)
  }
};

async function sendingPackages(lastId = "$") {
  // `results` is an array, each element of which corresponds to a key.
  // Because we only listen to one key (mystream) here, `results` only contains
  // a single element. See more: https://redis.io/commands/xread#return-value
  const results = await redis.xread("block", 0, "STREAMS", "sendPackages", lastId);
  const [key, messages] = results[0];

  messages.forEach(processPackage);
  
  // const mongo = require('./mongoDB')
  // const userSchema = require('./schemas/user-schema')
  // const connectToMongoDB = async ()=> {
  //     await mongo().then(async (mongoose) => {
  //         try{
  //             console.log('connect to mongo')
  //             //inser data to mongo db, databas name is dataMongo, collection is dataBase
  //             await new userSchema(message).save()
  //         }finally{
  //             mongoose.connection.close()
  //             console.log('disconnect')
  
  //         }
  //     })
  // }
  // connectToMongoDB()
    

  //Pass the last id of the results to the next round.
  await sendingPackages(messages[messages.length - 1][0]);
}


module.exports = {
  sendingPackages
}



