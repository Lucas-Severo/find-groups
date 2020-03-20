const { Schema, model } = require('mongoose');

const GroupSchema = Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    media: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = model('group', GroupSchema);