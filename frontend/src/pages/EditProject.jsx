import {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import FormProject from '../components/FormProject';
import useProjects from '../hooks/useProjects'

const EditProject = () => {
  const {id} = useParams();
  const {getProject, project, loading} = useProjects();

  useEffect(()=>{
    getProject(id);
  }, [])

  if(loading) return <div className='text-center text-xl font-bold flex justify-center items-center'>Loading...</div>

  const {_id, name, client, description} = project;
  return (
    <div>
      <h1 className='text-3xl font-black '>Edit Project: {name}</h1>
      <div className='mt-10 flex justify-center'>
        <FormProject />
      </div>
      </div>
  )
}

export default EditProject