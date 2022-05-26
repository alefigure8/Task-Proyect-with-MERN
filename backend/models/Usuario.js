import mongoose from 'mongoose';

const usuarioSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  email:{
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  token: {
    type: String
  },
  confirm: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;