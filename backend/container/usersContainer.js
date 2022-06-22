import Usuario from '../models/Usuario.js';
import generateId from '../helpers/generateID.js';

class Users {
  async saveUser(data){
    const usuario = new Usuario(data);
    usuario.token = generateId();
    const userSave = await usuario.save();
    return userSave;
  }

  async duplicate(data){
    const {email} = data;
    const existUSer = await Usuario.findOne({ email });
    return existUSer;
  }

  async autenticate(data){
    const {email, password} = data;
    const user = await Usuario.findOne({ email });
    return user;
  }

}

export default Users;