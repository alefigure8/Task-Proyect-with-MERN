import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Alert from '../components/Alert';
import clientAxios from '../config/clientAxios';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const {setAuth} = useAuth();
  const navigate = useNavigate();

  // Function to login the user
  const handleSubmit =  async (e) =>{
    e.preventDefault();

  // validation
  if([email, password].includes('')){
    setAlert({error: true, msg: 'Please fill all the fields'});
    setTimeout(() => {
      setAlert('');
    } , 3000)
    return ;
  }

try {
  // submit to server
  const url = '/users/login';
  const {data} = await clientAxios.post(url, {email, password});
  setAlert({error: false, msg: data.msg});
  setTimeout(() => {
    setAlert('');
  } , 3000)

  // save the token in the local storage
  localStorage.setItem('token', data.user.token);

  // send the token to the context
  setAuth(data.user);

  // empty the form
  setEmail('');
  setPassword('');

  // redirect to projects
  navigate('/projects');

} catch (error) {
  setAlert({error: true, msg: error.response.data.msg});
  setTimeout(() => {
    setAlert('');
  } , 3000)
}
  }
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Login and Manage your
        <span className="text-slate-700"> projects</span>
      </h1>
      {alert?.msg && <Alert alert={alert}/>}
      <form onSubmit = {handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
        <div>
          <label 
            className="Uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
            >Email</label>
          <input 
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-3 border rounded-xl bg-gray-50 border-sky-600 p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label 
            className="Uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            >Password</label>
          <input 
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full mt-3 border rounded-xl bg-gray-50 border-sky-600 p-3 my-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-3" />
      </form>

      <nav
        className="lg:flex lg:justify-evenly"
      >
        <Link 
          to="/register" 
          className="my-5 block text-center text-sky-600 font-bold  text-sm"
          >Don't have an account?</Link>
        <Link 
          to="/forgot-password" 
          className="my-5 block text-center text-sky-600 font-bold  text-sm"
          >Forgot your password?</Link>
      </nav>

    </>
  )
}

export default Login