import mongoose from 'mongoose';

const task = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  priority:{
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  completedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  }
}, {
  timestamp: true,
})

const Task = mongoose.model('Task', task);

export default Task;