import { useEffect } from 'react';
import {useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'

const Project = () => {
  const {id} = useParams();
  const {getProject, project, loading} = useProjects();

  useEffect(()=>{
    getProject(id);
  }, [])

  if(loading) return <div className='text-center text-xl font-bold flex justify-center items-center'>Loading...</div>

  const {_id, name, client, description} = project;

  return (
    <div>
      <div className='flex justify-between'>
        <h1
          className='text-3xl font-black'
        >
          {name}
        </h1>
        <div className='flex gap-2 text-gray-400 hover:text-gray-500 transition-colors'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <Link to={`/projects/edit/${_id}`} className='uppercase font-bold'>Editar</Link>
        </div>
      </div>

    </div>
  )
}

export default Project