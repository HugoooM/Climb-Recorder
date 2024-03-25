const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email:{type:String, required: true, unique : true},
    password : {type: String, required : true},
    name : {type:String, required:true},
    firstname : {type:String, required:true},
    licence : {type : Number, required: false},
    initiateur: {type:Boolean, required : false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
