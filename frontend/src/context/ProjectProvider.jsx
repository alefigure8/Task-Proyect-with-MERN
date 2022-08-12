import {useState, useEffect, createContext} from 'react'
import clientAxios from '../config/clientAxios';
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { io } from "socket.io-client";

let socket;

const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [modalForm, setModalForm] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalDeleteColaborator, setModalDeleteColaborator] = useState(false);
  const [task, setTask] = useState({});
  const [colaborator, setColaborator] = useState({});
  const [modalSearch, setModalSearch] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth()

    // config Header fetching token
    const setHeaderConfig = () => {
      const token = localStorage.getItem('token')
      if(!token){
        return
      }
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
      return config
    }

  // Function to get all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const config = setHeaderConfig()
        const {data} = await clientAxios.get('/projects', config);
        setLoading(false)
        setProjects(data.data);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })

        setTimeout(() => {
          setAlert({})
        }
        , 3000)
      }
    }
    fetchProjects();
  }, [auth]);

  // call to socket io
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

  // Setting alert message
  const showAlert = (alertObject) => {
    setAlert(alertObject)
    setTimeout(()=>{
      setAlert({})
    }, 3000)
  }

  // Setting projects
  const submitProject = async(project) => {
    if(project.id){
      await editProject(project)
    } else {
      await createProject(project)
    }
  }

  // Edit project
  const editProject = async(projectUpdated) => {
    try {
      const config = setHeaderConfig()

      const {data} = await clientAxios.put(`projects/${projectUpdated.id}`, projectUpdated, config)

      // Updating the project in the projects array
      const projectsUpdated = projects.map( project => project._id === data.data._id ? data.data :  project )
      setProjects(projectsUpdated)

      setAlert({
          msg: data.msg,
          error: false
        })

      setTimeout(()=>{
        setAlert({})
        navigate('/projects')
      }, 3000)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }
      , 3000)
    }

  }

  // Create a new project
  const createProject = async(project) => {
    try{

      const config = setHeaderConfig()

      const {data} = await clientAxios.post('projects', project, config)

      setProjects([...projects, data.data])

      setAlert({
        msg: data.msg,
        error: false
      })

      setTimeout(()=>{
        setAlert({})
        navigate('/projects')
      }, 3000)

    } catch(error){
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }
      , 3000)
    }
  }

  // Get project by id
  const getProject = async (id) => {
    try{
      setLoading(true)

      const config = setHeaderConfig()
      const {data} = await clientAxios.get(`projects/${id}`, config)
      setProject(data.data)
      setLoading(false)

    } catch (error){
      navigate('/projects')
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }
      , 3000)
    }
  }

  // Delete a project
  const deleteProject = async (id) => {
    try {
      const config = setHeaderConfig()
      const {data} = await clientAxios.delete(`projects/${id}`, config)
      const projectRemaining = projects.filter(project => project._id !== id)
      setProjects(projectRemaining)

      setAlert({
        msg: data.msg,
        error: false
      })

      setTimeout(()=>{
        setAlert({})
        navigate('/projects')
      }, 3000)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlert({})
      }
      , 3000)
    }
  }

  // handle Modal
  const handleModal = () => {
    setModalForm(!modalForm)
    setTask({})
  }

  // submit task
  const submitTask = async(task) => {
    if(task.id){
      await updateTask(task)
    } else {
      await createTask(task)
    }
  }

  const createTask = async(task) => {
    try {
      const config = setHeaderConfig()
      const {data} = await clientAxios.post('tasks', task, config)

      //socket io
      socket.emit('createTask', data.task)

      // close modal
      setModalForm(false)

      // alert
      setAlert({
        msg: data.msg,
        error: false
      })

      setTimeout(()=>{
        setAlert({})
      }, 3000)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(()=>{
        setAlert({})
      }, 3000)
    }
  }

  const updateTask = async(task) => {
    try {
      const config = setHeaderConfig()
      const {data} = await clientAxios.put(`tasks/${task.id}`, task, config)

      socket.emit('updateTask', data.task)

      // close modal
      setModalForm(false)

      // alert
      setAlert({
        msg: data.msg,
        error: false
      })

      setTimeout(()=>{
        setAlert({})
      }, 3000)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(()=>{
        setAlert({})
      }, 3000)
    }
  }

  // Edit task
  const editTask = async task => {
    setModalForm(true)
    setTask(task)
  }

  // Delete task
  const handleModalDelete = task => {
    setTask(task)
    setModalDelete(!modalDelete)
  }

  const deleteTask = async() => {
    try {
      const config = setHeaderConfig()
      const {data} = await clientAxios.delete(`tasks/${task._id}`, config)

      socket.emit('deletedTask', task)

      setAlert({
        msg: data.msg,
        error: false
      })

      setModalDelete(false)
      setTask({})

      setTimeout(()=>{
        setAlert({})
      }, 3000)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(()=>{
        setAlert({})
      }, 3000)
    }
  }

  // add colaborator
  const searchColaborator = async(email) => {
    setLoading(true)
    try {
      const config = setHeaderConfig()
      const {data} = await clientAxios.post(`/projects/colaborators`, {email}, config)
      setColaborator(data.data);

      // message
      setAlert({
        msg: data.msg,
        error: false
      })

      setTimeout(()=>{
        setAlert({})
      }
      , 3000)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(()=>{
        setAlert({})
      }, 3000)
    }
    setLoading(false)
  }

  const addColaborator = async email => {
    try {
      const config = setHeaderConfig()
      const {data} = await clientAxios.post(`/projects/colaborators/${project._id}`, email, config)

      // alert
      setAlert({
        msg: data.msg,
        error: false
      })

      // reset alert
      setTimeout(()=>{
        setAlert({})
      } , 3000)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(()=>{
        setAlert({})
      }
      , 3000)
    }

    // reset colaborator
    setColaborator({})
  }

  // habnle colaborator modal
  const handleModalColaborator = async colaboratorDelte => {
    setColaborator(colaboratorDelte);
    setModalDeleteColaborator(!modalDeleteColaborator)
  }

  const deleteColaborator = async() => {
    try {
      const config = setHeaderConfig()
      const {data} = await clientAxios.post(`/projects/remove-colaborators/${project._id}`, colaborator, config)

      const updatedProject = {...project}
      updatedProject.colaborators = updatedProject.colaborators.filter(colaborator => colaborator._id !== colaborator._id)
      setProject(updatedProject)

      setModalDeleteColaborator(false)

      // alert
      setAlert({
        msg: data.msg,
        error: false
      })

      // reset alert
      setTimeout(()=>{
        setAlert({})
      } , 3000)
    }
    catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(()=>{
        setAlert({})
      }
      , 3000)
    }
  }

  const handleSatatus = async id => {
    try{
      const config = setHeaderConfig()
      const {data} = await clientAxios.post(`/tasks/status/${id}`, {}, config)
  
      socket.emit('statusTask', data.task)

      // alert
      setAlert({
        msg: data.msg,
        error: false
      })

      setTimeout(()=>{
        setAlert({})
      }, 3000)
    }catch (error){
      setAlert({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(()=>{
        setAlert({})
      }
      , 3000)
    }
  }

  const handleModalSearch = () => {
    setModalSearch(!modalSearch)
  }

  // Socket.io

  const submitProjectTask = task => {
    // Updating the project in the projects array
    const projectUpdated = {...project}
    projectUpdated.tasks = [...projectUpdated.tasks, task]
    setProject(projectUpdated)

  }

  const handleDeleteTask = async deletedTask => {
    // Updating the project in the projects array
    const updatedProject = {...project}
    updatedProject.tasks = updatedProject.tasks.filter(taskStatus => taskStatus._id !== deletedTask._id)
    setProject(updatedProject)

  }

  const handleUpdateTask = async updatedTask => {
    // Updating the project in the projects array
    const projectUpdated = {...project}
    projectUpdated.tasks = projectUpdated.tasks.map( taskStatus => taskStatus._id === updatedTask._id ? updatedTask : taskStatus )
    setProject(projectUpdated)

  }

  const handleStatusTask = async task => {
    // Updating the project in the projects array
    const projectUpdated = {...project}
    projectUpdated.tasks = projectUpdated.tasks.map( taskStatus => {
      return taskStatus._id === task._id ? task : taskStatus
    } )
    setProject(projectUpdated)

  }

  // LOgout
  const handleLogout = () => {
    setProjects([])
    setProject({})
    setColaborator({})
    setTask({})
    setModalForm(false)
    setModalDelete(false)
    setModalDeleteColaborator(false)
    setModalSearch(false)
    setLoading(false)
    setAlert({})
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        loading,
        alert,
        modalForm,
        modalDelete,
        task,
        colaborator,
        modalDeleteColaborator,
        modalSearch,
        handleLogout,
        handleStatusTask,
        handleUpdateTask,
        handleDeleteTask,
        submitProjectTask,
        handleSatatus,
        handleModalSearch,
        deleteColaborator,
        handleModalColaborator,
        addColaborator,
        searchColaborator,
        deleteTask,
        submitTask,
        submitProject,
        getProject,
        editTask,
        deleteProject,
        showAlert,
        handleModal,
        handleModalDelete
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export {ProjectProvider};

export default ProjectContext;