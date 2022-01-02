let mongoose = require('mongoose')

let storageSchema = new mongoose.Schema({
    email: {
        type: String
    },
    firstname: {
        type: String
    },
    groupName: {
        type: String
    },
    items: {
        type: Array
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    storageLocation: {
        type: String
    },
    surname: {
        type: String
    },
})

let Storage = mongoose.model('Storage', storageSchema)

module.exports = Storage