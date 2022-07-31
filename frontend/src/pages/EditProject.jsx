import {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import FormProject from '../components/FormProject';
import useProjects from '../hooks/useProjects'

const EditProject = () => {
  const {id} = useParams();
  const {deleteProject, getProject, project, loading} = useProjects();

  useEffect(()=>{
    getProject(id);
  }, [])

  if(loading) return <div className='text-center text-xl font-bold flex justify-center items-center'>Loading...</div>

  const {_id, name} = project;

  const handleClick = () => {
    if(window.confirm('Are you sure?')){
      deleteProject(id);
    }

  }
  return (
    <div>
      <div className='flex justify-between'>
        <h1
          className='text-3xl font-black'
        >
         Edit: {name}
        </h1>
        <div className='flex items-center gap-2 text-gray-400 hover:text-gray-500 transition-colors'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
          <button to={`/projects/edit/${_id}`} onClick={handleClick} className='uppercase font-bold'>Delete</button>
        </div>
      </div>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
      </div>
  )
}

export default EditProject