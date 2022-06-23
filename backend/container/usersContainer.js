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
    const existUser = await Usuario.findOne({ email });
    return existUser;
  }

  async autenticate(data){
    const {email, password} = data;
    const user = await Usuario.findOne({ email });
    return user;
  }

  async comparePassword(data, password){

    const compare = await data.comparePassword(password)

    if(compare){
      return {
        _id: data._id,
        name: data.name,
        email: data.email
      }
    }

    return false;

  }

}

export default Users;