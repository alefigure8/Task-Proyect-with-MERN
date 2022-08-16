import User from '../container/usersContainer.js';

/* Init Class */
const usuario = new User()

 
/* register User */
const registerUser = async (req, res) => {
  const duplicateUser = await usuario.searchUserbyMail(req.body);

  // Check if user alredy exist
  if(duplicateUser.data){
    const error = new Error('User is alredy register')
    return res.status(400).json({msg: error.message})
  }

  // save user
  try {
    const userSaved = await usuario.saveUser(req.body);

    if(!userSaved.data){
      return res.status(404).json(userSaved)
    }

    return res.status(200).json(userSaved);

  } catch (err){
    console.log(`Error: ${err.messagge}`);
  }
}


/* autenticate users */
const autenticateUser = async (req, res) => {
  const userData = await usuario.searchUserbyMail(req.body);

  try {

    // check if user does not exist
    if(!userData.data){
      return res.status(404).json(userData)
    }

    // check if user is confirmed
    if(!userData.confirm){
      const error = new Error('Your account is not confirmed yet')
      return res.status(404).json({msg: error.message})
    }

    // check if password is correct
    const compareData = await usuario.comparePassword(userData, req.body.password);
    if(!compareData.user){
      return res.status(404).json(compareData)
    } else {

      return res.json(compareData);
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

    if(!userConfirmed.data){
      return res.status(404).json(userConfirmed)
    }

    return res.status(200).json(userConfirmed)

  } catch (err) {
    console.log(`Error: ${err.messagge}`);
  }
}


/* Confirm Token*/
const confirm = async (req, res) => {
  const token = req.params.token;
  const userConfirmed =  await usuario.token(token)

  try {
    if(!userConfirmed.data){
      return res.status(404).json(userConfirmed)
    }

      return res.json(userConfirmed)
  } catch (err) {
    console.log(`Error: ${err.messagge}`);
  }
}


/* Forgot password. Gnerate a new token */
const forgotPassword = async (req, res) => {
  const {email} = req.body;
  const user = await usuario.searchUserbyMail({email});

  if(!user.data){
    return res.status(404).json(user)
  }

  try {
    const generateNewToken = await usuario.generateToken(email)

    if(!generateNewToken.data){
      return res.status(404).json( )
    }

    return res.json(generateNewToken);

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

    if(!newPasswordGenerated.data){
      return res.status(404).json(newPasswordGenerated)
    }

    return res.json(newPasswordGenerated);

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