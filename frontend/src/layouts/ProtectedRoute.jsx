import {Navigate, Outlet, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const ProtectedRoute = () => {
  const {auth, loading} = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <>
    { auth._id && (
      <div className='bg-gray-100'>
        <Header />
        <div className='md:flex md:min-h-screen'>
          <Sidebar />
          <main
            className='flex-1 overflow-hidden md:overflow-auto p-10'
          >
            <Outlet />
          </main>
        </div>
      </div>
    )}
    </>
  )
}

export default ProtectedRoute