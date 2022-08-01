import React from 'react'
import Preview from '../components/Preview';
import useProjects from '../hooks/useProjects'

const Projects = () => {
  const {projects, loading} = useProjects();
  if(loading) return <p>LOADING...</p>

  return (
    <>
      <h1
        className='text-3xl font-black'
      >
        Projects
      </h1>
      <div className='bg-white mt-5 rounded-lg '>
        {projects?.length > 0 ?
          projects.map(project => (
            <Preview key={project._id} project={project}/>
            ))
        : <p className='text-center text-gray-600 uppercase p-5'>No projects</p>}
      </div>

    </>
  )
}

export default Projects