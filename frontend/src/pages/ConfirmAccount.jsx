import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import Alert from '../components/Alert'
import clientAxios from '../config/clientAxios';

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const params = useParams();
  const {id} = params;
  let once = true;

  useEffect(() => {
    if(once){
      (async() => {
        try {
          const url = `/users/confirm/${id}`;
          const {data} = await clientAxios(url)
          setAlert({msg: data.msg, error: false})
          setConfirmed(true)
        } catch (error) {
          setAlert({msg: error.response.data.msg, error: true})
        }
      })();
      once = false;
    }
  }, []);

  return (
  <>
    <h1 className="text-sky-600 font-black text-6xl capitalize">
      Confirm your account and start to create your
      <span className="text-slate-700"> projects</span>
    </h1>
    {alert?.msg && <Alert alert={alert} />}
    {confirmed && <div className="text-center"><Link to="/login">Go to login</Link></div>}
  </>
  )
}

export default ConfirmAccount