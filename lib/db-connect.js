const mongoose = require('mongoose')
const config = require('./../config/index')
mongoose.connect(`${config.db.protocol}://${config.db.host}:${config.db.port}/${config.db.database}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
 
module.exports = mongoose