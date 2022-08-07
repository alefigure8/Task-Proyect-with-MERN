import React from 'react'
import useProjects from '../hooks/useProjects';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const Colaborators = ({colaborator}) => {
  const {handleModalColaborator} = useProjects();
  const {name, email, _id} = colaborator;
  const {auth} = useAuth();
  const admin = useAdmin();

  return (
    <div className='border-b p-5 flex justify-between'>
      <div>
        <p className='font-bold text-gray-700'>{name}</p>
        <p className='text-gray-600 text-sm'>{email}</p>
      </div>
     {auth._id === _id || admin ? (
       <button 
       onClick={() => handleModalColaborator(colaborator)}
       className='uppercase bg-red-600 px-4 py-2 font-bold text-sm text-white rounded-lg'
     >
        Remove
      </button>
     ):
     <button 
        disabled
       className='uppercase bg-gray-400 px-4 py-2 font-bold text-sm text-gray-200 rounded-lg'
     >
        Remove
      </button>
    }
    </div>
  )
}

export default Colaborators