const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    data: String,
    done: {
        default: false,
        type: Boolean
    }
});

module.exports = {
    Todos: mongoose.model('Todo', TodoSchema)
};