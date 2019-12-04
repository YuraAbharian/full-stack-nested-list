const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const itemSchema = new Schema({
    message: {
        type: String
    },
    position: {
        type: Number
    },
    parent: {
        type: String
    },
    showSublist: {
        type: Boolean
    },
    ancestors: {
        type: Array
    },
    subListId: {
        type: String
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;