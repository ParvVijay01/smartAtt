const mongoose = require("mongoose")

const attSchema = new mongoose.Schema({
    att: {
        type: Boolean,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


module.exports = mongoose.model("Attendance", attSchema)