import Usuario from '../models/Usuario.js';

class Users {
  async saveUser(data){
    const usuario = new Usuario(data);
    const userSave = await usuario.save();
    return userSave;
  }

  async duplicate(data){
    const {email} = data;
    const existUSer = await Usuario.findOne({ email });
    return existUSer;
  }
}

export default Users;