import Usuario from '../models/Usuario.js';
import generateId from '../helpers/generateID.js';
import generateJWT from '../helpers/generateJWT.js';

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
    const {email} = data;
    const user = await Usuario.findOne({ email });
    return user;
  }

  async comparePassword(data, password){
    const compare = await data.comparePassword(password)

    if(compare){
      return {
        _id: data._id,
        name: data.name,
        email: data.email,
        token: generateJWT(data._id)
      }
    }

    return false;
  }

  async confirmToken(token){
    const user = await Usuario.findOne({ token });
    if(user){
      user.confirm = true;
      user.token = '';
      const userConfirmed = await user.save();
      return userConfirmed;
    }
    
    return false;
  }

}

export default Users;