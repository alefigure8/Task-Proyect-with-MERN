import Usuario from '../models/Usuario.js';

class Users {
  async saveUser(data){
    const usuario = new Usuario(data);
    const userSave = await usuario.save();
    return userSave;
  }
}

export default Users;