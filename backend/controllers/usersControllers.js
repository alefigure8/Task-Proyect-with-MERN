import User from '../container/usersContainer.js';

/* Init Class */
const usuario = new User()


/* register User */
const registerUser = async (req, res) => {

  const duplicateUser = await usuario.searchUserbyMail(req.body);

  // Check if user alredy exist
  if(duplicateUser){
    const error = new Error('User is alredy register')
    return res.status(400).json({msg: error.message})
  }

  // save user
  try {
    await usuario.saveUser(req.body);
    res.json({msg: 'User created successfully'});
  } catch (err){
    console.log(`Error: ${err.messagge}`);
  }
}


/* autenticate users */
const autenticateUser = async (req, res) => {
  const userData = await usuario.searchUserbyMail(req.body);

  try {

    // check if user does not exist
    if(!userData){
      const error = new Error('User does not exist')
      return res.status(404).json({msg: error.message})
    }

    // check if user is confirmed
    if(!userData.confirm){
      const error = new Error('Your account is not confirmed yet')
      return res.status(404).json({msg: error.message})
    }

    // check if password is correct
    const compareData = await usuario.comparePassword(userData, req.body.password);
    if(compareData){
      return res.json({msg: 'User autenticated successfully', user: compareData});
    } else {
      const error = new Error('Password is incorrect')
      return res.status(404).json({msg: error.message})
    }

  } catch (error) {
    console.log(`Error: ${error.messagge}`);
  }

}

/* Confirm Token and change status*/
const confirmPassword = async (req, res) => {
  const token = req.params.token;
  const userConfirmed =  await usuario.confirmToken(token)
  try {
    if(userConfirmed){
      return res.json({msg: 'Your account is confirmed'})
    } else {
      const error = new Error('Token is incorrect')
      return res.status(404).json({msg: error.message})
    }
  } catch (err) {
    console.log(`Error: ${err.messagge}`);
  }
}


/* Confirm Token*/
const confirm = async (req, res) => {
  const token = req.params.token;
  const userConfirmed =  await usuario.token(token)
  try {
    if(userConfirmed){
      return res.json({msg: 'The token is correct'})
    } else {
      const error = new Error('Token is incorrect')
      return res.status(404).json({msg: error.message})
    }
  } catch (err) {
    console.log(`Error: ${err.messagge}`);
  }
}


/* Forgot password. Gnerate a new token */
const forgotPassword = async (req, res) => {
  const {email} = req.body;
  const user = await usuario.searchUserbyMail({email});

  if(!user){
    const error = new Error('User does not exist')
    return res.status(404).json({msg: error.message})
  }

  try {
    const generateNewToken = await usuario.generateToken(email)

    if(generateNewToken){
      res.json({msg: 'We have sent you an email with a link to reset your password'});
    } else {
      const error = new Error('Error generating token')
      return res.status(404).json({msg: error.message})
    }
  } catch (error) {
    console.log(`Error: ${error.messagge}`);
  }
}


/* Reset password*/
const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const {password} = req.body;
    const newPasswordGenerated = await usuario.resetPassword({token, password});

    if(newPasswordGenerated){
      res.json({msg: 'Your password has been changed successfully'});
    } else {
      const error = new Error('Token is incorrect')
      return res.status(404).json({msg: error.message})
    }
  } catch (error) {
    console.log(`Error: ${error.messagge}`);
  }
}


/* Perfil del usuario */
const perfil = async (req, res) => {
  const user = req.user;
  res.json(user);
}


export {
  registerUser,
  autenticateUser,
  confirm,
  forgotPassword,
  resetPassword,
  perfil,
  confirmPassword
};