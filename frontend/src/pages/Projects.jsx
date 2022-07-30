import React from 'react'
import useProjects from '../hooks/useProjects'

const Projects = () => {
  const {projects, loading} = useProjects();
  if(loading) return <p>Loading...</p>

  return (
    <>
      <h1
        className='text-3xl font-black'
      >
        Projects
      </h1>
      <div className='mt-5'>
        {projects?.data?.length > 0 ?
          projects.data.map(project => (
           <div key={project.id}>
             <h2 className='text-2xl font-black'>
                {project.name}
              </h2>
            <p>{project.description}</p>
           </div>
            ))
        : "No hay proyectos"}
      </div>

    </>
  )
}

export default Projects