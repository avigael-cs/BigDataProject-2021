// export BIGML_USERNAME = avigael-cs
// export BIGML_API_KEY = 21b8f167c93e8cb5364258b164a64041c8535717
// export BIGML_CRED = "username=$BIGML_USERNAME;api_key=$BIGML_API_KEY"
// export BIGML_PROJECT = project/61768d0799dfe70754014923

const mongoose = require ('mongoose')
//adress to our mongo
const mongoPath = 'mongodb+srv://dataBase:vNblIWm3JpxaEjJc@cluster0.ckqda.mongodb.net/dataMongo?retryWrites=true&w=majority'
//vNblIWm3JpxaEjJc

module.exports = async () =>{
  await mongoose.connect(mongoPath, {
    useNewUrlParser:true,
    useUnifiedTopology:true })
    return mongoose
}






