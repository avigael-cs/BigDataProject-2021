const {MongoClient} = require('mongodb');
    async function main(){
        /**
         * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
         * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
         */
         const uri = "mongodb+srv://bigData2021:bigdata@cluster0.ckqda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
     
    
        const client = new MongoClient(uri);
     
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            await listDatabases(client);
            // Make the appropriate DB calls
            await  listDatabases(client);
     
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    async function listDatabases(client){
        const databasesList = await client.db().admin().listDatabases();
     
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

    main().catch(console.error);