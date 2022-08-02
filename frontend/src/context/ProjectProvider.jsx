import {useState, useEffect, createContext} from 'react'
import clientAxios from '../config/clientAxios';
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [modalForm, setModalForm] = useState(false);

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
  }

  // submit task
  const submitTask = async(task) => {
    try {
      const config = setHeaderConfig()
      const {data} = await clientAxios.post('tasks', task, config)

      // Updating the project in the projects array
      const projectUpdated = {...project}
      projectUpdated.tasks = [...project.tasks, data.task]
      setProject(projectUpdated)

      // alert
      setAlert({
        msg: data.msg,
        error: false
      })

      setTimeout(()=>{
        setAlert({})
        setModalForm(false)
      }, 1000)
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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        loading,
        alert,
        modalForm,
        submitTask,
        handleModal,
        showAlert,
        getProject,
        submitProject,
        deleteProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export {ProjectProvider};

export default ProjectContext;