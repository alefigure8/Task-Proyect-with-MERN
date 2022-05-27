import User from '../container/usersContainer.js';

/* Init Class */
const usuario = new User()


/* register User */
const registerUser = async (req, res) => {

  const duplicateUser = await usuario.duplicate(req.body); // Check if user alredy exist

  if(duplicateUser){
    const error = new Error('User is alredy register')
    return res.status(400).json({msg: error.message}) // send error message
  }

  try {
    const UserData = await usuario.saveUser(req.body); // save user
    res.json(UserData);
  } catch (err){
    console.log(`Error: ${err.messagge}`);
  }

}

export {
  registerUser
};