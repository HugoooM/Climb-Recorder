const mongoose = require('mongoose');
const user = require('./User');
const voie = require('./Voie');

const grimpeSchema = mongoose.Schema({
    grimpeur: {type: mongoose.Schema.Types.ObjectId, ref: user, required: true},
    voie: {type: mongoose.Schema.Types.ObjectId, ref: voie, required: true},
    date: {type: Date, required: true},
    commentaire: {type: String, required: false}
});

module.exports = mongoose.model('Grimpe', grimpeSchema);