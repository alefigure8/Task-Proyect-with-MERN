import {useState, useEffect, createContext} from 'react'
import clientAxios from '../config/clientAxios';
import {useNavigate} from 'react-router-dom'

const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const token = localStorage.getItem('token');
      try {
        const {data} = await clientAxios.get('/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProjects(data.data);
        setLoading(false)
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
  }, []);

  // Setting alert message
  const showAlert = (alertObject) => {
    setAlert(alertObject)
    setTimeout(()=>{
      setAlert({})
    }, 3000)
  }

  // config

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

  // Setting projects
  const submitProject = async(project) => {

    if(project.id){
      editProject(project)
    } else {
      createProject(project)
    }

  }

  const editProject = async(projectUpdated) => {
    try {
      const config = setHeaderConfig()

      const {data} = await clientAxios.put(`projects/${projectUpdated.id}`, projectUpdated, config)

      // Updating the project in the projects array
      const projectsUpdated = projects.map( project => {
        if(project._id === data.data._id){
          return data.data
        } else {
          return project
        }
      })

      setProjects([...projectsUpdated])

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

  const createProject = async(project) => {
    try{

      const config = setHeaderConfig()

      console.log(config)

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

  const getProject = async (id) => {
    try{
      setLoading(true)
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

  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        loading,
        alert,
        showAlert,
        getProject,
        submitProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export {ProjectProvider};

export default ProjectContext;