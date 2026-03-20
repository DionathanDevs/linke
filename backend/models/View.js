const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

// We enforce a singleton pattern for the views count
module.exports = mongoose.model('View', viewSchema);
