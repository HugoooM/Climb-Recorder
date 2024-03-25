const mongoose = require('mongoose');
const user = require('./User')

const voieSchema = mongoose.Schema({
   secteur: {type:Number, required: true},
   couleur: {type: String, required: true},
    ouvreur: {type:  mongoose.Schema.Types.ObjectId, ref:user, required: true},
    cotation: {type: String, required: true},
    commentaire : {type: String, required : false},
    imageUrl:{type: String, required: false}
});

module.exports = mongoose.model('Voie', voieSchema);