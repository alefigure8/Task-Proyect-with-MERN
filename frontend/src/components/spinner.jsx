import React from 'react'

const spinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-green-900" role="status">
        <span className='text-white'>.</span>
      </div>
    </div>
  )
}

export default spinner