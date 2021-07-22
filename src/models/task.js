const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        // unique: true
    },
    completed: {
        type: Boolean,
        default: () => false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

taskSchema.index(
    {
        description: 1,
        owner: 1
    },
    {
        unique: true
    })


taskSchema.pre('save', async function () {
    try {


    } catch (e) {

    }
})


const Task = mongoose.model('Task', taskSchema)



module.exports = {
    Task
}