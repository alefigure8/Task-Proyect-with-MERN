import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  name: {type: String, required: true, trim: true},
  description: {type: String, required: true, trim: true},
  date: {type: Date, default: Date.now},
  client: {type: String, required: true, trim: true},
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  colaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    }
  ]
  },
  {
    timestamps: true
  }
  );

  const Project = mongoose.model('Project', projectSchema);
  export default Project;