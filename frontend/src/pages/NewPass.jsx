import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Alert from '../components/Alert'
let once = true;
import clientAxios from '../config/clientAxios';

const NewPass = () => {
  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [passwordConfirmed, setPasswordConfirmed] = useState(false)
  const params = useParams();
  const {token} = params;

  useEffect(() => {
    if(once){
      const confirmToken = async () => {
        try {
          const url = `/users/forgot/${token}`;
          await clientAxios(url);
          setConfirm(true)
        } catch (error) {
          setAlert({msg: error.response.data.msg, error: true})
        }
      }
      confirmToken();
      once = false;
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password == ''){
      setAlert({msg: 'Password is required', error: true})
      return;
    }

    if(password.length < 6){
      setAlert({msg: 'Password must be at least 6 characters', error: true})
      return;
    }

    try {
      const url = `/users/forgot/${token}`;
      const {data} = await clientAxios.post(url, {password});
      setAlert({msg: data.msg, error: false})
      setPassword('');
      setPasswordConfirmed(true);
    } catch (error) {
      setAlert({msg: error.response.data.msg, error: true})
    }
  }

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reset yourr password and do not lose access to your
        <span className="text-slate-700"> projects</span>
      </h1>
      {alert?.msg && <Alert alert={alert}/>}
      {confirm && 
        <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-3">
          <label 
            className="Uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
            >New Password</label>
          <input 
            id="password"
            type="password"
            placeholder="Enter your new password"
            className="w-full mt-3 border rounded-xl bg-gray-50 border-sky-600 p-3 my-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Save new password" className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5" />
      </form> }
      {passwordConfirmed && <div className="text-center"><Link to="/login">Login</Link></div>}
    </>
  )
}

export default NewPass