import React from 'react'
import FormProject from '../components/FormProject'
const Projects = () => {

  return (
    <>
      <h1
        className='text-3xl font-black'
      >
        Create a new project
      </h1>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>

    </>
  )
}

export default Projects