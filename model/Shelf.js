const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ShelfSchema = new Schema({
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

const Shelf = mongoose.model('Shelf', ShelfSchema);

module.exports = Shelf;