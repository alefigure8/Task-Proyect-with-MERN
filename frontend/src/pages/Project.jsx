import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import ModalFormTask from '../components/ModalFormTask'

const Project = () => {
  const {id} = useParams();
  const {getProject, project, loading, handleModal} = useProjects();

  useEffect(()=>{
    getProject(id);
  }, [])

  if(loading) return <div className='text-center text-xl font-bold flex justify-center items-center'>Loading...</div>


  const {_id, name} = project;

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
          <Link to={`/projects/edit/${_id}`} className='uppercase font-bold'>Edit</Link>
        </div>
      </div>
      <button onClick={handleModal} className='text-white text-sm uppercase font-bold bg-sky-600 hover:bg-sky-700 mt-5 px-5 py-3 rounded-lg w-full md:w-auto flex gap-2 items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        New Task
      </button>
      <ModalFormTask />
    </div>
  )
}

export default Project