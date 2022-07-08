import {Link} from 'react-router-dom'
import {useState} from 'react';
import Alert from '../components/Alert';
import clientAxios from '../config/clientAxios';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if(email === '' || email.length < 6){
      setAlert({error: true, msg: 'Please enter a valid email address'});
      setTimeout(() => {
        setAlert('');
      }, 3000);
      return;
    }

   try {
     // send email to server
     const url = `/users/forgot`;
     const {data}= await clientAxios.post(url, {email});

     // handle response
    setAlert({error: false, msg: data.msg});

    // clear form
    setEmail('');

   } catch (error) {
      setAlert({error: true, msg: error.response.data.msg});
      setTimeout(() => {
        setAlert('');
      }, 3000);
   }

  }

  return (
    <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Recover your access and do not lose your
      <span className="text-slate-700"> projects</span>
    </h1>
    {alert?.msg && <Alert alert={alert}/>}
    <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">

      <div className="my-2">
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
          onChange ={e=> setEmail(e.target.value)}
        />
      </div>

      <input type="submit" value="Send instructions" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
    </form>

    <nav
      className="lg:flex lg:justify-evenly"
    >
      <Link
        to="/"
        className="my-5 block text-center text-sky-600 font-bold  text-sm"
        >Have an account?</Link>
      <Link
          to="/register"
          className="my-5 block text-center text-sky-600 font-bold  text-sm"
          >Don't have an account?</Link>
    </nav>

  </>
  )
}

export default ForgotPass