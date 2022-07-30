import {useState, useEffect, createContext} from 'react'
import clientAxios from '../config/clientAxios';
import {useNavigate} from 'react-router-dom'

const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const navigate = useNavigate();

  // Setting alert message
  const showAlert = (alertObject) => {
    setAlert(alertObject)
    setTimeout(()=>{
      setAlert({})
    }, 3000)
  }

  // Setting projects
  const submitProject = async(project) => {
    try{
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

      await clientAxios.post('projects', project, config)

      setAlert({
        msg: 'Project created succesfully',
        error: false
      })

      setTimeout(()=>{
        setAlert({})
        navigate('/projects')
      }, 3000)

    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      try {
        const {data} = await clientAxios.get('/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProjects(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProjects();
  }, [projects]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        showAlert,
        alert,
        submitProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export {ProjectProvider};

export default ProjectContext;