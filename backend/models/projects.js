import mongoose, { Schema, model } from 'mongoose';

const projectSchema = new Schema({
  name: {type: String, required: true, trim: true},
  description: {type: String, required: true, trim: true},
  date: {type: Date, default: Date.now},
  client: {type: String, required: true, trim: true},
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  colaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
    }
  ]
  },
  {
    timestamps: true
  }
  );

  const Project = model('Project', projectSchema);
  export default Project;