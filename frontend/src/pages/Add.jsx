import React from 'react'
import FormColaborator from '../components/FormColaborator'
import useProjects from '../hooks/useProjects'

const Add = () => {
  const {project, loading} = useProjects();

  if(loading) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <h1 className='text-3xl font-black'>{`Add Colaborator to: ${project.name}`}</h1>
      <div className='flex justify-center mt-10'>
        <FormColaborator />
      </div>
    </>
  )
}

export default Add