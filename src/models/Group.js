const { Schema, model } = require('mongoose');
const paginate = require('mongoose-paginate');

const GroupSchema = Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
        lowercase: true
    },
    media: {
        type: String,
        require: true,
        lowercase: true
    },
    url: {
        type: String,
        require: true,
        lowercase: true
    }
}, {
    timestamps: true
});

GroupSchema.plugin(paginate);
module.exports = model('group', GroupSchema);