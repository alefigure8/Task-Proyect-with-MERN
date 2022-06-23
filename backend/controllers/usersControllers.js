import User from '../container/usersContainer.js';

/* Init Class */
const usuario = new User()


/* register User */
const registerUser = async (req, res) => {

  const duplicateUser = await usuario.duplicate(req.body);

  // Check if user alredy exist
  if(duplicateUser){
    const error = new Error('User is alredy register')
    return res.status(400).json({msg: error.message})
  }

  // save user
  try {
    const UserData = await usuario.saveUser(req.body);
    res.json(UserData);
  } catch (err){
    console.log(`Error: ${err.messagge}`);
  }
}


/* autenticate users */
const autenticateUser = async (req, res) => {
  const userData = await usuario.autenticate(req.body);

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
    return res.json(compareData);
  } else {
    const error = new Error('Password is incorrect')
    return res.status(404).json({msg: error.message})
  }
}

/* Confirm User by email */
const confirm = async (req, res) => {
  const token = req.params.token;
  const userConfirmed =  await usuario.confirmToken(token)

  if(userConfirmed){
    return res.json({userConfirmed})
  } else {
    return res.json({msg: 'Token is incorrect'})
  }

}

export {
  registerUser,
  autenticateUser,
  confirm
};