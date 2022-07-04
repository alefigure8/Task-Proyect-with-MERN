import {Link} from 'react-router-dom';
import {useState} from 'react';
import Alert from '../components/alert';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // empty fields
    if([name, email, password, confirmPassword].includes('')) {
      setAlert({error: true, msg: 'Please fill in all fields'});
      return;
    }

    // password mismatch
    if(password !== confirmPassword) {
      setAlert({error: true, msg: 'Passwords do not match'});
      return;
    }

    // password length
    if(password.length < 6) {
      setAlert({error: true, msg: 'Password must be at least 6 characters'});
      return;
    }
    setAlert({});

    // send to server
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {name, email, password});

      // success message
      setAlert({error: false, msg: data.msg});

      // clear fields
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setAlert({error: true, msg: error.response.data.msg});
    }
  }

  const {msg} = alert;

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Create your account and Manage your
      <span className="text-slate-700"> projects</span>
    </h1>
    {msg && <Alert alert={alert} />}
    <form
      className="my-10 bg-white shadow rounded-lg p-10"
      onSubmit={(e) => {handleSubmit(e)}}
      >

      <div className="my-2">
        <label
          className="Uppercase text-gray-600 block text-xl font-bold"
          htmlFor="name"
          >Name</label>
        <input
          id="name"
          type="text"
          placeholder="What is your name?"
          className="w-full mt-3 border rounded-xl bg-gray-50 border-sky-600 p-3"
          value={name}
          onChange = {e => setName(e.target.value)}
        />
      </div>

      <div className="my-5">
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
          onChange = {e => setEmail(e.target.value)}
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
          onChange = {e => setPassword(e.target.value)}
        />
      </div>

      <div className="my-5">
        <label
          className="Uppercase text-gray-600 block text-xl font-bold"
          htmlFor="RepeatPassword"
          >Repeat your password</label>
        <input
          id="RepeatPassword"
          type="password"
          placeholder="Enter your password again"
          className="w-full mt-3 border rounded-xl bg-gray-50 border-sky-600 p-3 my-3"
          value={confirmPassword}
          onChange = {e => setConfirmPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Create account" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
    </form>

    <nav
      className="lg:flex lg:justify-evenly"
    >
      <Link 
        to="/" 
        className="my-5 block text-center text-sky-600 font-bold  text-sm"
        >Have an account?</Link>
      <Link 
        to="/forgot-password" 
        className="my-5 block text-center text-sky-600 font-bold  text-sm"
        >Forgot your password?</Link>
    </nav>

  </>
  )
}

export default Register