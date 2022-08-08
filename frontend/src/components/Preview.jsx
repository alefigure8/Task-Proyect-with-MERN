import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Preview = ({project}) => {
  const {auth}  = useAuth()
  const {name, client, _id, createdBy} = project
  const isOwner = createdBy === auth._id
  return (
    <div className='border-b border-gray-300 flex flex-col md:flex-row p-5 justify-between'>
      <div className='flex gap-2 justify-between mb-4 md:mb-0'>
        <p className='flex gap-2'>
          {name}
          <span className='flex-1 text-gray-400 uppercase'>{' '}{client}</span>
        </p>
          {!isOwner && 
            <p className='py-1 px-2 bg-green-700 text-sm text-white font-bold uppercase rounded-md'>Colaborator</p>
          }
      </div>
        <Link to={`${_id}`} className=' text-gray-500 hover:text-gray-600 transition-colors font-bold text-sm uppercase'>go to project</Link>
    </div>
  )
}

export default Preview