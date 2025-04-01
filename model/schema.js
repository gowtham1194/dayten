const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { type: String, enum: ['Open', 'In Progress', 'Completed'], default: 'Open' }
});

module.exports = mongoose.model('Task', taskSchema);
