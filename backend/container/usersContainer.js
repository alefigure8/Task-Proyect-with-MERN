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

    if(userSave){
      return {msg: 'User created successfully', data: userSave};
    }

    return {msg: 'User created failed', data: false};
  }

  async searchUserbyMail(data){
    const {email} = data;
    const existUser = await Usuario.findOne({ email });

    if(existUser){
      return { msg: 'User finded' , data: existUser };
    }

    return {msg: 'User does not exist', data: false};
  }

  async comparePassword(data, password){
    const compare = await data.comparePassword(password)

    if(compare){
      return {msg: 'User autenticated successfully', user: {
        _id: data._id,
        name: data.name,
        email: data.email,
        token: generateJWT(data._id)
      }}
    }

    return {msg: error.message, user: false};
  }

  async confirmToken(token){
    const user = await Usuario.findOne({ token });
    if(user){
      user.confirm = true;
      user.token = '';

      const userConfirmed = await user.save();

      return {msg: 'User confirmed successfully', data: userConfirmed};
    }

    return {msg: 'Token is incorrect', data: false};
  }

  async token(token){
    const user = await Usuario.findOne({ token });
    if(user){
      return {msg: 'The token is correct', data: user};
    }
    return {msg: 'Token is incorrect', data: false};
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

      return {msg: 'We have sent you an email with a link to reset your password', data: userForgot};
    }

    return {msg: 'Error generating token', data: false};;
  }

  async resetPassword(data){
    const {token, password} = data;
    const user = await Usuario.findOne({ token });
    if(user){
      user.password = password;
      user.confirm = true;
      user.token = '';
      const userReset = await user.save();
      return {msg: 'Your password has been changed successfully', data: userReset};
    }

    return {msg: 'Token is incorrect', data: false};
  }

}

export default Users;