const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    containedIn: {
        type: Schema.Types.ObjectId,
        ref: 'Qrawer',
        required: true
    }
},
    { timestamps: true }
);

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;