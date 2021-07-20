const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const QrawerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    shelves: [{
        type: Schema.Types.ObjectId,
        ref: 'Shelf'
    }]
},
    { timestamps: true }
);
//
//
// // On save hook.
// // Before the model gets saved, run this function
// ProjectSchema.pre('save', async function(next){
//     const user = this;
//     try {
//         const salt = await bcrypt.genSalt();
//         console.log('salt', salt);
//         const hash = await bcrypt.hash(user.password, salt);
//         console.log('hash', hash);
//         user.password = hash;
//         next();
//     } catch(e) {
//         return next(err);
//     }
// });
//
// ProjectSchema.methods.comparePassword = async function(candidatePassword, callback){
//     const user = this;
//     try {
//         const isMatch = await bcrypt.compare(candidatePassword, user.password);
//         callback(null, isMatch);
//     } catch(err) {
//         callback(err);
//     }
// };

const Qrawer = mongoose.model('Qrawer', QrawerSchema);

module.exports = Qrawer;
