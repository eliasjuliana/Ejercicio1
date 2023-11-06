import mongoose from 'mongoose';

const Task = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    duedate: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Tasks', Task);
