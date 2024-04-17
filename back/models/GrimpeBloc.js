const mongoose = require('mongoose');
const user = require('./User');
const bloc = require('./Bloc');

const grimpeBlocSchema = mongoose.Schema({
    grimpeur: {type: mongoose.Schema.Types.ObjectId, ref: user, required: true},
    bloc: {type: mongoose.Schema.Types.ObjectId, ref: bloc, required: true},
    date: {type: Date, required: true},
    commentaire: {type: String, required: false}
});

module.exports = mongoose.model('GrimpeBloc', grimpeBlocSchema);