import User from '../container/usersContainer.js'

/* Init Class */
const usuario = new User()


/* register User */
const registerUser = async (req, res) => {
  try {
    const UserData = await usuario.saveUser(req.body);
    res.json(UserData);
  } catch (err){
    console.log(`Error: ${err.messagge}`);
  }

}

export {
  registerUser
};