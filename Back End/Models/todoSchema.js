const mongoose = require('mongoose');
const user = require('./Users');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'in progess', ' completed'],
        default: 'pending'
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",
    //     role: "mother",
    //     required: true,
    // },
    date:{
        type:Date, 
        default: Date.now,
    }
},{
    strict:false,
    versionKey:false
}
)

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;