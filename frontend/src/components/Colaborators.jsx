import React from 'react'
import useProjects from '../hooks/useProjects';

const Colaborators = ({colaborator}) => {
  const {handleModalColaborator} = useProjects();
  const {name, email} = colaborator;
  return (
    <div className='border-b p-5 flex justify-between'>
      <div>
        <p className='font-bold text-gray-700'>{name}</p>
        <p className='text-gray-600 text-sm'>{email}</p>
      </div>
      <button 
            onClick={() => handleModalColaborator(colaborator)}
            className='uppercase bg-red-600 px-4 py-2 font-bold text-sm text-white rounded-lg'
          >
            Delete
      </button>

    </div>
  )
}

export default Colaborators