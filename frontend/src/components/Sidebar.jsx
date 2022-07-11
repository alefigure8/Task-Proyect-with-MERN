import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const {auth} = useAuth();
  return (
    <aside
      className='md:w-80 lg:w96 p-5 bg-gray-100'
    >
      <p
        className='font-bold'
      >
        Hola, {auth.name}!
      </p>
      <Link
        to='create-project'
        className='block p-2 rounded-md text-sm bg-sky-600 text-white text-center font-bold uppercase hover:bg-sky-700 mt-5'
      >
        New projects
      </Link>
    </aside>
  )
}

export default Sidebar