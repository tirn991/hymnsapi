var mongoose = require('mongoose');

module.exports = mongoose.model("song", new mongoose.Schema({
    songnumber: { type: Number, required: true },
    songname: { type: String, required: true },
    songlanguage: { type: String, required: true },
    alternativebook: { type: Array, required: false },
    songcontent: { type: Array, required: true },
    status: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }), "song");