import Usuario from '../models/Usuario.js';
import generateId from '../helpers/generateID.js';
import generateJWT from '../helpers/generateJWT.js';
import {emailRegister, emailForgot} from '../helpers/emails.js'

class Users {
  async saveUser(data){
    const usuario = new Usuario(data);
    usuario.token = generateId();
    const userSave = await usuario.save();

    // send email
    emailRegister({
      name: userSave.name,
      email: userSave.email,
      token: userSave.token
    });

    return userSave;
  }

  async searchUserbyMail(data){
    const {email} = data;
    const existUser = await Usuario.findOne({ email });
    return existUser;
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

  async token(token){
    const user = await Usuario.findOne({ token });
    if(user){
      return user;
    }
    return false;
  }

  async generateToken(email){
    const user = await Usuario.findOne({ email });
    if(user){
      user.token = generateId();
      const userForgot = await user.save();

      emailForgot({
        name: user.name,
        email: user.email,
        token: user.token
      });

      return userForgot;
    }

    return false;
  }

  async resetPassword(data){
    const {token, password} = data;
    const user = await Usuario.findOne({ token });
    if(user){
      user.password = password;
      user.confirm = true;
      user.token = '';
      const userReset = await user.save();
      return userReset;
    }

    return false;
  }

}

export default Users;