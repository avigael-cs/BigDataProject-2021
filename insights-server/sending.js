
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dataMongo = 'testDB';
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology:true });

client.connect(function(err) {

    const db = client.db(dataMongo);
    const data = fs.readFileSync('out_file.json');
    const docs = JSON.parse(data.toString());
    
    db.collection('outCollection')
        .insertMany(docs, function(err, result) {
            if (err) throw err;
            console.log('Inserted docs:', result.insertedCount);
            client.close();
    });
});