const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone: String,
    status: String
})

const recorddb = mongoose.model('recorddb', schema);

module.exports = recorddb;