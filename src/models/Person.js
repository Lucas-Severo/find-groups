const { Schema, model } = require('mongoose');

const PersonSchema = Schema({
    nickname: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'group'
    }]
}, {
    timestamps: true
});

module.exports = model("person", PersonSchema);