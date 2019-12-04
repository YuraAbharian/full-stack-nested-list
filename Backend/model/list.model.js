const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const listSchema = new Schema({
    parent: {
        type: String
    },
    ancestors: {
        type: Array
    }
        
})

const List = mongoose.model('List', listSchema);

module.exports = List;