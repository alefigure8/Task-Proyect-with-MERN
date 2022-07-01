import {Link} from 'react-router-dom';
import {useState} from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Create your account and Manage your
      <span className="text-slate-700"> projects</span>
    </h1>
    <form action="" className="my-10 bg-white shadow rounded-lg p-10">

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