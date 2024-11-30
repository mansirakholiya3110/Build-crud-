const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        require: true,
        minlength: 10
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true 
    }
},
    {
        versionKey: false,
        timestamps: true
    })


module.exports = mongoose.model('User', UserSchema)