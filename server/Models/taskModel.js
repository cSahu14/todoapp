const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name."]
    },
    status: {
        type: String,
        enum: ["Todo", "In Progress", "Completed"],
        required: [true, "Please add status."]
    },
    isCompleted: {
        type: Boolean,
        required: [true, "Please add isCompleted flag."]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please add user reference."]
    }
}, {
    timestamps: true
})

const Task = mongoose.model("Task", TaskSchema)
module.exports = Task;