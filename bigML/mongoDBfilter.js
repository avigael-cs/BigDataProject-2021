
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://bigData2021:bigdata@cluster0.ckqda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


function createNewWriteObj(packageuuid, update) {
    return {
        updateOne: {
            filter: { packageduuid: packageuuid },
        }
    }
}
function createNewFindObj(packageuuid) {
    return { packageduuid: packageuuid }
}

var Db = {
    CreateOrder: function (packageObject) {
        //---------choose your db here ------------------
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("testDB");
            const result = dbo.collection("testCol").insertMany(packageObject, function (err, res) {
                if (err) throw err;
                db.close();
                console.log(`${res.insertedCount} documents were inserted`);
                return true;
            });
        });

    },
    

    DeleteOrder: function (info) {
        console.log('Delete Order: ' + info);
    },
    UpdateOrder: function (info) {
        console.log('Update Order ' + info);
    },
    ReadOrders: function () {
        var sum = 0;
        MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("testDB");
            dbo.collection("testCol").find().toArray(function (err, result) {
                if (err) throw err;
                //console.log(result);
                db.close();
                //return result
            });
        });

    },
    FindAllOrdersById: async function (arrayOfObject) {
        if (arrayOfObject.length > 0) {
            var arrToFind = [];
            const db = await MongoClient.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
            var dbo = db.db("testDB");
            for (let i = 0; i < arrayOfObject.length; i++) {
                arrToFind.push(createNewFindObj(arrayOfObject[i].packageduuid))
            }
            const x = await dbo.collection("testCol").find({ $or: arrToFind }).toArray()
            db.close();
            return x
        }
    }
};

module.exports = Db