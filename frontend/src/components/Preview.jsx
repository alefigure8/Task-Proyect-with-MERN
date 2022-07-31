import React from 'react'
import { Link } from 'react-router-dom'

const Preview = ({project}) => {
  const {name, client, _id} = project
  return (
    <div className='border-b border-gray-300 flex p-5'>
      <p className='flex-1'>
        {name}
        <span className='flex-1 text-gray-400 uppercase'>{' '}{client}</span>
      </p>
      <Link to={`${_id}`} className=' text-gray-500 hover:text-gray-600 transition-colors font-bold text-sm uppercase'>got to project</Link>
    </div>
  )
}

export default Preview