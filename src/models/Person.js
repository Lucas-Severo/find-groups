const { Schema, model } = require('mongoose');

const PersonSchema = Schema({
    nickname: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'group'
    }]
}, {
    timestamps: true
});

module.exports = model("person", PersonSchema);