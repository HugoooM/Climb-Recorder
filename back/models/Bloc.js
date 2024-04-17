const mongoose = require('mongoose');
const user = require('./User');

const blocSchema = mongoose.Schema({
    secteur: {type: String, required: true},
    couleur: {type: String, required: true},
    ouvreur: {type: mongoose.Schema.Types.ObjectId, ref: user, required: true},
    cotation: {type: String, required: true},
    commentaire: {type: String, required: false}
});

module.exports = mongoose.model('Bloc', blocSchema);