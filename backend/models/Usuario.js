import mongoose from 'mongoose';
import bcrypt, { hash } from 'bcrypt';

/* Schema*/
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
});

/* Hashing password */
usuarioSchema.pre('save', async function (next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

usuarioSchema.methods.comparePassword = async function (password){
  return await bcrypt.compare(password, this.password);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;