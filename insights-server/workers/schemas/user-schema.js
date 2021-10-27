const { ListCollectionsCursor } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
        id:{type: String,
            required: true},
        //items: [Schema.Types.Mixed],
        price: {type: String,
            required: true},
        size: {type: String,
            required: true},
        dest: {type: String,
            required: true},
        from: {type: String,
                required: true}
})
module.exports = mongoose.model('package',userSchema)