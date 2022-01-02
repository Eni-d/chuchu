let mongoose = require('mongoose')

let residenceSchema = new mongoose.Schema({
    email: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    residentialLocation: {
        type: String
    },
    surname: {
        type: String
    },
})

let Residence = mongoose.model('Residence', residenceSchema)

module.exports = Residence