import React from 'react'
import { useEffect } from 'react';
import FormColaborator from '../components/FormColaborator'
import useProjects from '../hooks/useProjects'

const Add = () => {
  const {project, loading, colaborator, addColaborator} = useProjects();
  const {email, name} = colaborator;

  if(loading) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <h1 className='text-3xl font-black'>{`Add Colaborator to: ${project.name}`}</h1>
      <div className='flex justify-center mt-10'>
        <FormColaborator />
      </div>
      {loading ? <h1>Loading...</h1> : colaborator?._id && (
        <div className='flex mt-10 justify-center '>
          <div className='bg-white py-10 px-5 w-full lg:w-1/2 rounded-lg shadow'>
            <h2 className='text-2xl font-black text-center'>Result</h2>
            <div className='flex justify-between mt-5'>
              <p className='text-gray-700'><span className='font-bold'>Name: </span>{name}</p>
              <button onClick={() => addColaborator({email})} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Add