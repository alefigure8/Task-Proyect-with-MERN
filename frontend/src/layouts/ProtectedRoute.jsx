import {Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

const ProtectedRoute = () => {
  const {auth, loading} = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <>
    { auth?._id ? <Outlet/> : <Navigate to='/'/> }
    </>
  )
}

export default ProtectedRoute