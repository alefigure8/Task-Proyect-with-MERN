import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import useProjects from '../hooks/useProjects'
import ModalFormTask from '../components/ModalFormTask'
import ModalDeleteTask from '../components/ModalDeleteTask'
import Task from '../components/Task';
import Alert from '../components/Alert';
import Colaborators from '../components/Colaborators';
import ModalColaborator from '../components/ModalColaborator';
import useAdmin from '../hooks/useAdmin';
import { io } from "socket.io-client";

let socket;
const Project = () => {
  const {id} = useParams();
  const {getProject, project, loading, handleModal, alert, submitProjectTask, handleDeleteTask, handleUpdateTask, handleStatusTask} = useProjects();
  const admin = useAdmin();

  useEffect(()=>{
    const getData = async () => {
      getProject(id);
    }
    getData();
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('open project', id)
  }, [])

  useEffect(() => {
    socket.on('addedTask', newTask => {
      if(newTask.project === project._id){
        submitProjectTask(newTask)
      }
    })

    socket.on('deletedTask', deletedTask => {
      if(deletedTask.project === project._id){
        handleDeleteTask(deletedTask)
      }
    })

    socket.on('updatedTask', updatedTask => {
      if(updatedTask.project === project._id){
        handleUpdateTask(updatedTask)
      }
    })

    socket.on('statusTask', data => {
      if(data.project._id === project._id){
        handleStatusTask(data)
      }
    })
  })

  if(loading) return <div className='text-center text-xl font-bold flex justify-center items-center'>Loading...</div>

  const {_id, name} = project;

   return (
    <div>
      <div className='flex justify-between items-center'>
        <h1
          className='text-3xl font-black'
        >
          {name}
        </h1>

        {admin && (
        <div className='flex gap-2 text-gray-400 hover:text-gray-500 transition-colors'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <Link to={`/projects/edit/${_id}`} className='uppercase font-bold'>Edit</Link>
        </div>
        )}

      </div>
      {admin && (
      <button onClick={handleModal} className='text-white text-sm uppercase font-bold bg-sky-600 hover:bg-sky-700 mt-5 px-5 py-3 rounded-lg w-full md:w-auto flex gap-2 items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        New Task
      </button>
      )}
      <div className='flex justify-center'>
        <div className='w-full md:w-4/12 lg:w-1/4'>
          {alert?.msg && <Alert alert={alert}/>}
        </div>
      </div>
      <div className='bg-white shadow mt-10 rounded-lg'>
        {project.tasks?.length > 0 ? project.tasks?.map( task => <Task key={task._id} task={task}/>) : <p className='text-center my-5 p-10 text-gray-400'> There is not tasks yet </p>}
      </div>
      <div className='mt-10 flex justify-between items-center'>
        <h3 className = 'text-3xl font-black'>Colaborador</h3>
        {admin && (
          <div className='flex gap-2 text-gray-400 hover:text-gray-500 transition-colors'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <Link to={`/projects/add/${_id}`} className='uppercase font-bold'>Add</Link>
          </div>
        )}
      </div>
      <div className='bg-white shadow mt-10 rounded-lg'>
        {project.colaborators?.length > 0 ? project.colaborators?.map(colaborator => <Colaborators key={colaborator._id} colaborator = {colaborator} />) : <p className='text-center my-5 p-10 text-gray-400'> There is not colaborators yet </p>}
      </div>
      <ModalFormTask />
      <ModalDeleteTask />
      <ModalColaborator />
    </div>
  )
}

export default Project